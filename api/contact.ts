// Vercel Serverless Function para envio de formulário via Resend + validação Cloudflare Turnstile

interface ContactPayload {
  category: 'doacao' | 'acolhimento'
  donorType?: 'pf' | 'pj'
  // PF
  nome?: string
  // PJ
  empresa?: string
  // Casa de Acolhimento
  instituicao?: string
  // Comuns PJ / Acolhimento
  contato?: string
  // Comuns Todos
  email: string
  whatsapp: string
  mensagem: string
  turnstileToken?: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  try {
    const body: ContactPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const {
      category,
      donorType,
      nome,
      empresa,
      instituicao,
      contato,
      email,
      whatsapp,
      mensagem,
      turnstileToken,
    } = body || {}

    if (!email || !whatsapp || !mensagem) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' })
    }

    // 1. Validar Cloudflare Turnstile se TURNSTILE_SECRET_KEY estiver configurada
    const turnstileSecret = (process.env.TURNSTILE_SECRET_KEY || '').trim()
    const configuredSiteKey = (
      process.env.VITE_TURNSTILE_SITE_KEY ||
      process.env.TURNSTILE_SITE_KEY ||
      ''
    ).trim()

    // Só valida com a secret real se o token não for o dummy token de teste da Cloudflare (XXXX.DUMMY.TOKEN.XXXX)
    const isDummyTestToken = Boolean(turnstileToken && turnstileToken.includes('DUMMY'))

    if (turnstileSecret && (!isDummyTestToken || configuredSiteKey)) {
      if (!turnstileToken) {
        return res.status(400).json({ error: 'Confirmação de segurança (Cloudflare Turnstile) obrigatória.' })
      }

      const verifyParams = new URLSearchParams()
      verifyParams.append('secret', turnstileSecret)
      verifyParams.append('response', turnstileToken)

      const cfResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: verifyParams,
      })
      const cfData = (await cfResponse.json()) as { success: boolean; 'error-codes'?: string[] }

      if (!cfData.success) {
        console.error('Turnstile verify error:', cfData)
        return res.status(403).json({
          error: 'Falha na verificação de segurança anti-bot. Recarregue a página e tente novamente.',
        })
      }
    }

    // 2. Montar conteúdo do e-mail
    const isDoacao = category === 'doacao'
    const isPF = isDoacao && donorType === 'pf'
    const isPJ = isDoacao && donorType === 'pj'

    let subjectPrefix = '[Contato Site]'
    let profileLabel = ''
    let detailsHtml = ''

    if (isPF) {
      subjectPrefix = '[Doação — Pessoa Física]'
      profileLabel = 'Doação — Pessoa Física'
      detailsHtml = `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475; width: 140px;"><strong>Nome:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(nome || '')}</td>
        </tr>
      `
    } else if (isPJ) {
      subjectPrefix = '[Doação — Pessoa Jurídica]'
      profileLabel = 'Doação — Pessoa Jurídica'
      detailsHtml = `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475; width: 140px;"><strong>Empresa:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(empresa || '')}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475;"><strong>Responsável:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(contato || '')}</td>
        </tr>
      `
    } else {
      subjectPrefix = '[Casa de Acolhimento]'
      profileLabel = 'Casa de Acolhimento / Organização Social'
      detailsHtml = `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475; width: 140px;"><strong>Instituição:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(instituicao || '')}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475;"><strong>Contato:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(contato || '')}</td>
        </tr>
      `
    }

    const senderDisplay = isPF ? nome : isPJ ? `${empresa} (${contato})` : `${instituicao} (${contato})`

    const htmlBody = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafd; padding: 32px; border-radius: 16px; border: 1px solid #e7e5ef;">
        <div style="background: #2f6f4c; color: #ffffff; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #ded05b; font-weight: 700;">Fundação Net do Bem</span>
          <h2 style="margin: 6px 0 0; font-size: 20px;">Novo contato recebido pelo site</h2>
        </div>

        <p style="color: #5f6475; font-size: 14px; margin-bottom: 20px;">
          Modalidade selecionada: <strong style="color: #2f6f4c;">${profileLabel}</strong>
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          ${detailsHtml}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475;"><strong>E-mail:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;"><a href="mailto:${escapeHtml(email)}" style="color: #2f6f4c;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #5f6475;"><strong>WhatsApp:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e7e5ef; color: #202434;">${escapeHtml(whatsapp)}</td>
          </tr>
        </table>

        <div style="background: #ffffff; padding: 18px 20px; border-radius: 12px; border: 1px solid #e7e5ef;">
          <strong style="display: block; color: #202434; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Mensagem:</strong>
          <p style="margin: 0; color: #202434; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(mensagem)}</p>
        </div>

        <p style="color: #8f93a1; font-size: 12px; margin-top: 24px; text-align: center;">
          Enviado através do formulário oficial em netdobem.org.br
        </p>
      </div>
    `

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL || 'site@netdobem.org.br'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Fundação Net do Bem <site@netdobem.org.br>'

    if (!resendApiKey) {
      return res.status(500).json({
        error: 'Chave RESEND_API_KEY não configurada no servidor.',
      })
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `${subjectPrefix} ${senderDisplay || email}`,
        html: htmlBody,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text()
      console.error('Erro Resend:', errorData)
      return res.status(502).json({
        error: 'Não foi possível enviar o e-mail pelo Resend. Verifique a configuração do domínio.',
      })
    }

    const data = await resendResponse.json()
    return res.status(200).json({ ok: true, id: data.id })
  } catch (err) {
    console.error('Erro ao processar envio de contato:', err)
    return res.status(500).json({ error: 'Erro interno ao processar sua mensagem.' })
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

