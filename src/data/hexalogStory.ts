/**
 * Positioning content sourced from Hexalog's public site (hexalog.in) and public interviews -
 * their own numbers and words, used to anchor this prototype to THEIR business.
 * All roll-up math below is simulated/illustrative for the concept prototype.
 */

export interface HexalogWin {
  stat: string
  statLabel: string
  connection: string
  /** Verifiable source link - rendered only when present. Never guess a URL here. */
  href?: string
}

export const HEXALOG_WINS: HexalogWin[] = [
  {
    stat: '97%',
    statLabel: 'On-time delivery rate',
    connection:
      'Exception recovery is what protects that number when a DOC_HOLD, berthing slip or failed attempt hits.',
    href: 'https://hexalog.in/get-quote',
  },
  {
    stat: 'Scale without expanding your ops team',
    statLabel: 'Hexalog freight-page promise',
    connection:
      'Exception handling IS the ops team. This is how the promise holds at 10× shipment volume.',
    href: 'https://hexalog.in/services/freight-forwarding',
  },
  {
    stat: '“What holds MSMEs back is rarely the product - it’s the supply chain behind it”',
    statLabel: 'Dibyanshu Tripathi, CEO - YourStory feature',
    connection:
      'Every cleared exception releases working capital for the smallest clients.',
    // Owner: paste the exact YourStory feature URL here before sending - do not guess it.
  },
]

export const NETWORK_ROLLUP = {
  basis: 'per 100 exceptions / month',
  stats: [
    { value: '230', unit: 'h', label: 'Ops hours returned / month', detail: '2.9h → 0.6h avg handling per exception' },
    { value: '₹4.2L', unit: '', label: 'Ops cost avoided / month', detail: 'at ₹1,800/hr blended ops cost' },
    { value: '34%', unit: '', label: 'Autonomously resolvable at Phase 4', detail: '30–40% band · customs DOC_HOLD class leads' },
  ],
  secondary: [
    { value: '₹1.9L', label: 'Duty & refunds recovered / month' },
    { value: '9', label: 'SLA breaches prevented / month' },
  ],
  derivationNote:
    'Simulated math: median 2.9h manual handling per exception (from the synthetic ~1,800-case history) reduced to 0.6h of review under Phase 3/4 autonomy; ₹4.2L ops cost avoided at a ₹1,800/hr blended ops rate; 34% of volume lands in the Phase-4 target class (30–40% band). Illustrative model - not measured Hexalog performance.',
}

export const SIMULATED_MATH_NOTE =
  'Roll-up is a simulated model built on the same synthetic ~1,800-case history used across the prototype - demonstrates the business-case approach, not measured Hexalog performance.'

export const PLATFORM_BRIDGE =
  'Assumed architecture - to validate in Week 1: a resolution layer on Hexalog’s orchestration platform, consuming its event streams, document store and partner network. Not a parallel system.'

/**
 * §3.1 - the assumptions surface. Naming what is assumed vs known vs simulated
 * is a product-management skill. Shown via the Assumptions badge
 * in the header of every screen.
 */
export const ASSUMPTIONS = {
  assumed: [
    'The orchestration platform exposes event streams, a document store and partner-network APIs in roughly the shape modelled here',
    'Exception records can be written back to the platform, not only read',
    '₹1,800/hr blended ops cost',
    '2.9h median handling time per exception',
    'Customs, carrier and warehouse systems are integrated enough to correlate a single shipment across all three',
  ],
  known: [
    '97% on-time delivery, 29,000+ pincodes, 80+ trade lanes, 100% HS classification accuracy, 10+ ports, 6+ VACs (hexalog.in)',
    'Active corridors: India–China, India–Middle East; expansion to Vietnam, Thailand, Oceania',
    'Stated architecture: a semantic layer over an orchestration layer',
  ],
  simulated: [
    'All shipment IDs, client names, values and timestamps',
    'The ~1,800-case history and the 214-case eval set',
    'Every figure on the Evaluation and Roadmap screens',
  ],
}

/** Author attribution - rendered in the footer of every screen. Links render only when filled. */
export const AUTHOR = {
  name: 'Yash N Shahdeo',
  email: 'yashnshahdeo@gmail.com',
  linkedin: '', // ← paste from resume header
  portfolio: '', // ← paste from resume header
  docUrl: '', // ← reasoning-doc URL (Notion / Google Doc) before send
} as const
