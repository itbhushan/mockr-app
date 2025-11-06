'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Sparkles, Zap, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const pricingTiers = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      comics: '2 total',
      description: 'Perfect to try it out',
      cta: 'Get Started',
      ctaLink: '/generate',
      popular: false
    },
    {
      name: 'Starter',
      price: { monthly: 4.99, annual: 49.99 },
      comics: '150/month',
      comicsDetail: '~5 per day',
      description: 'For casual satirists',
      cta: 'Choose Starter',
      ctaLink: '/generate',
      popular: false,
      savings: 'Save $9.89'
    },
    {
      name: 'Pro',
      price: { monthly: 9.99, annual: 99.99 },
      comics: '500/month',
      comicsDetail: '~16 per day',
      description: 'For content creators',
      cta: 'Choose Pro',
      ctaLink: '/generate',
      popular: true,
      savings: 'Save $19.89'
    },
    {
      name: 'Unlimited',
      price: { monthly: 19.99, annual: 199.99 },
      comics: 'Unlimited',
      comicsDetail: 'Create as many as you want',
      description: 'For power users',
      cta: 'Choose Unlimited',
      ctaLink: '/generate',
      popular: false,
      savings: 'Save $39.89'
    }
  ]

  const faqs = [
    {
      question: "What's included in all plans?",
      answer: "All plans include the Mockr watermark, download capability, and social sharing. The only difference is how many comics you can create."
    },
    {
      question: "What happens when I reach my limit?",
      answer: "You'll see a friendly reminder to upgrade. Your existing comics stay accessible, you just can't create more until next month or you upgrade."
    },
    {
      question: "What's the Lifetime Deal?",
      answer: "Pay $249 once and get unlimited comics forever. No monthly fees, no expiration. Limited time offer - ending soon!"
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes! Cancel anytime from your account. You keep access until your billing period ends."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards and PayPal through Lemon Squeezy."
    },
    {
      question: "Can I upgrade or downgrade plans?",
      answer: "Absolutely! Change plans anytime from your dashboard. Upgrades take effect immediately."
    },
    {
      question: "Do unused comics roll over?",
      answer: "No, your comic limit resets on your monthly billing date. Choose a plan that fits your average usage."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes! 7-day money-back guarantee on all plans. Contact support@mockr.art if you're not satisfied."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Simple, Transparent Pricing</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 mb-6 leading-tight">
              Create Satire.{' '}
              <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                Share Truth.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Choose a plan that fits your creative needs. All plans include the Mockr watermark.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-neutral-100 rounded-full p-1 mb-12">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-neutral-800 text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-neutral-800 text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Annual
                <span className="ml-2 text-xs">Save up to 17%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all ${
                  tier.popular
                    ? 'border-neutral-800 shadow-xl'
                    : 'border-neutral-200 hover:border-neutral-300 shadow-lg hover:shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{tier.name}</h3>
                  <p className="text-neutral-600 text-sm">{tier.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-neutral-900">
                      ${billingCycle === 'monthly' ? tier.price.monthly : tier.price.annual}
                    </span>
                    {tier.price.monthly > 0 && (
                      <span className="text-neutral-600 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && tier.savings && (
                    <p className="text-sm text-green-600 font-semibold mt-2">{tier.savings}</p>
                  )}
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-2 text-neutral-900 font-semibold text-lg mb-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>{tier.comics}</span>
                  </div>
                  {tier.comicsDetail && (
                    <p className="text-center text-neutral-600 text-sm">{tier.comicsDetail}</p>
                  )}
                </div>

                <Link href={tier.ctaLink}>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-neutral-800 to-neutral-700 text-white hover:from-neutral-900 hover:to-neutral-800 shadow-md hover:shadow-lg'
                        : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifetime Deal Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>🔥 LIMITED TIME OFFER</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Lifetime Deal
              </h2>
              <p className="text-xl sm:text-2xl mb-2 font-semibold">
                Pay Once, Create Forever
              </p>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Get unlimited comics for life with a one-time payment. No subscriptions, no limits.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
                <div className="text-6xl font-extrabold mb-4">$249</div>
                <div className="text-lg mb-4">One-time payment</div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Unlimited comics (forever)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Lifetime updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>Founding member badge 🏆</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span>⚠️</span>
                  <span>Ending Soon</span>
                </p>
              </div>

              <Link href="/generate">
                <button className="bg-white text-amber-600 px-10 py-4 rounded-xl font-bold text-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl">
                  Claim Your Lifetime Access
                </button>
              </Link>

              <p className="mt-6 text-white/80 text-sm">
                Join the founding members who never pay again
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-neutral-600">
              All plans include Mockr watermark, download, and social sharing
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-4 px-4 font-bold text-neutral-900">Plan</th>
                  <th className="text-left py-4 px-4 font-bold text-neutral-900">Price</th>
                  <th className="text-left py-4 px-4 font-bold text-neutral-900">Comics/Month</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 font-semibold">Free</td>
                  <td className="py-4 px-4">$0</td>
                  <td className="py-4 px-4">2 lifetime</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 font-semibold">Starter</td>
                  <td className="py-4 px-4">$4.99/mo or $49.99/yr</td>
                  <td className="py-4 px-4">150</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors bg-amber-50">
                  <td className="py-4 px-4 font-semibold flex items-center space-x-2">
                    <span>Pro</span>
                    <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">POPULAR</span>
                  </td>
                  <td className="py-4 px-4">$9.99/mo or $99.99/yr</td>
                  <td className="py-4 px-4">500</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 font-semibold">Unlimited</td>
                  <td className="py-4 px-4">$19.99/mo or $199.99/yr</td>
                  <td className="py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors bg-orange-50">
                  <td className="py-4 px-4 font-semibold flex items-center space-x-2">
                    <span>🔥 Lifetime</span>
                  </td>
                  <td className="py-4 px-4 font-bold">$249 once</td>
                  <td className="py-4 px-4 font-bold">Unlimited (forever)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors bg-white"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-600 flex-shrink-0 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Join creators who are turning political news into viral satire
            </p>

            <Link href="/generate">
              <button className="px-10 py-5 bg-white text-neutral-900 rounded-xl hover:bg-neutral-100 transition-all shadow-2xl hover:shadow-3xl font-bold text-xl">
                Start Creating Free
              </button>
            </Link>

            <p className="mt-6 text-neutral-400">
              No credit card required • 2 free comics to start
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
