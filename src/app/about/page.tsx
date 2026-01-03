export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-900 mb-4">About CarbonCot</h1>
        <div className="h-1 w-24 bg-green-700 mx-auto"></div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            CarbonCot is a transparent platform designed to make carbon credit
            trading accessible and credible. We provide individuals and
            businesses with an easy way to explore verified carbon projects,
            purchase credits, and instantly receive retirement certificates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">✓</span>
              <span>
                <strong className="text-green-900">Verified Projects:</strong> Browse
                carbon projects certified by Verra and Gold Standard
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">✓</span>
              <span>
                <strong className="text-green-900">Transparent Information:</strong> View
                detailed project information including methodology, location, and
                SDG benefits
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">✓</span>
              <span>
                <strong className="text-green-900">Instant Certificates:</strong> Receive
                digital retirement certificates immediately after purchase
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">✓</span>
              <span>
                <strong className="text-green-900">Easy Navigation:</strong> Filter projects
                by country, type, certification, and price range
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            For Everyone
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you&apos;re an individual looking to offset your personal
            carbon footprint, a business seeking ESG compliance, or a
            sustainability enthusiast exploring carbon impact, CarbonCot provides
            the tools you need.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a prototype platform using dummy
              data. No real transactions or backend integrations are included.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

