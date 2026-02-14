@echo off
REM Add all environment variables to Vercel

echo Adding BIGCOMMERCE_STOREFRONT_TOKEN...
vercel env add BIGCOMMERCE_STOREFRONT_TOKEN production

echo Adding AUTH_SECRET...
vercel env add AUTH_SECRET production

echo Adding TURBO_REMOTE_CACHE_SIGNATURE_KEY...
vercel env add TURBO_REMOTE_CACHE_SIGNATURE_KEY production

echo Adding ENABLE_ADMIN_ROUTE...
vercel env add ENABLE_ADMIN_ROUTE production

echo Adding TRAILING_SLASH...
vercel env add TRAILING_SLASH production

echo.
echo Done! Now run: npx vercel --prod
