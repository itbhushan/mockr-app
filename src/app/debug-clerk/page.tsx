'use client'

export default function DebugClerkPage() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Clerk Debug Information</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-lg mb-2">Publishable Key Status:</h2>
            <div className="bg-neutral-100 p-4 rounded font-mono text-sm break-all">
              {publishableKey ? (
                <>
                  <p className="text-green-600 mb-2">✅ Key Found</p>
                  <p>Key: {publishableKey}</p>
                  <p className="mt-2">
                    {publishableKey.startsWith('pk_live_') ? (
                      <span className="text-green-600">✅ Production Key (pk_live_)</span>
                    ) : publishableKey.startsWith('pk_test_') ? (
                      <span className="text-yellow-600">⚠️ Test Key (pk_test_) - Switch to Production!</span>
                    ) : (
                      <span className="text-red-600">❌ Invalid Key Format</span>
                    )}
                  </p>
                </>
              ) : (
                <p className="text-red-600">❌ No Key Found</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Current Domain:</h2>
            <div className="bg-neutral-100 p-4 rounded font-mono text-sm">
              {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h2 className="font-semibold text-lg mb-2">Checklist:</h2>
            <ul className="space-y-2">
              <li>1. ✅ Get production keys from Clerk Dashboard</li>
              <li>2. ✅ Update keys in Netlify environment variables</li>
              <li>3. ⚠️ Add mockr.art to Clerk allowed domains</li>
              <li>4. ⚠️ Trigger new Netlify deployment</li>
              <li>5. ⚠️ Clear browser cache and test</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
            <h3 className="font-semibold mb-2">Quick Fix Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to Clerk Dashboard → Configure → Domains</li>
              <li>Add domain: <code className="bg-white px-2 py-1 rounded">mockr.art</code></li>
              <li>Go to Netlify → Site Settings → Environment Variables</li>
              <li>Verify keys are production (pk_live_ and sk_live_)</li>
              <li>Trigger new deploy in Netlify → Deploys → Trigger Deploy</li>
              <li>Wait 2-3 minutes for build</li>
              <li>Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)</li>
              <li>Test sign-in again</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
