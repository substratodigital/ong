export default function handler(_req: any, res: any) {
  const siteKey =
    process.env.VITE_TURNSTILE_SITE_KEY ||
    process.env.TURNSTILE_SITE_KEY ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    ''

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  return res.status(200).json({ siteKey })
}
