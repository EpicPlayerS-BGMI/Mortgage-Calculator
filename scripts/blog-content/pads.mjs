import { section, paras, ul } from "./_helpers.mjs";

/** Unique extra sections inserted before FAQs to reach 950+ words. */
export const PADS = {
  "build-emergency-fund-from-scratch": section(
    "A 12-Month Build Timeline You Can Copy",
    paras(
      "Month 1 focuses only on opening a dedicated account and automating a transfer you can tolerate even in a tight month. The amount matters less than the separation from daily spending. Month 2 adds a no-spend weekend challenge and routes the avoided costs into the fund. Month 3 sells unused electronics or furniture and treats the proceeds as a one-time accelerator rather than lifestyle money.",
      "Months 4–6 raise the automated amount after any raise, overtime, or cancelled subscription. If your essentials total ₹40,000, aiming for ₹10,000–₹15,000 by month six already changes how you handle a medical bill. Months 7–9 audit insurance so a single hospital visit does not empty the cash you just built. Months 10–12 recalculate essentials for inflation and decide whether three or six months is the right ceiling given job stability.",
      "Couples should agree on withdrawal rules in writing: job loss and urgent health events qualify; festival shopping does not. Freelancers should size the fund off a weak-month essentials total, not a peak invoice month. When the fund is used, schedule a refill sprint before restarting aggressive investing so the next shock does not force high-interest borrowing.",
      "Track progress with a simple thermometer on your phone notes app. Celebrate the starter milestone and the one-month milestone publicly with a partner or friend who will ask about the next transfer. Social accountability is surprisingly effective when the dollar amounts feel small day to day."
    ) +
      "\n" +
      ul([
        "Keep the fund in a bank you do not use for daily UPI or debit spending.",
        "Name the account Emergency Only to reduce mental leakage.",
        "Review the target every time rent resets.",
        "Pair fund building with a written list of what does not count as an emergency.",
      ])
  ),

  "car-leasing-vs-buying-financial-breakdown": section(
    "Total Cost of Ownership Beyond the Payment",
    paras(
      "Insurance premiums are often higher on new leased vehicles than on a five-year-old owned car with liability needs met. Maintenance may be covered under warranty during a lease, which feels like a win, yet you simultaneously pay for depreciation you will never recover. Buyers who keep cars for 200,000 kilometres capture the cheap years after the loan ends—years leasers never experience because they return the vehicle and start another contract.",
      "Opportunity cost matters too. A large capitalised cost reduction on a lease is cash that could have earned interest elsewhere or reduced a purchase loan. If you must put money down, buying usually builds equity more transparently. Conversely, if your employer covers high mileage and you dislike repair surprises, a well-negotiated lease can be a rational operating expense—especially when you account for the time value of not managing an ageing car.",
      "Create a one-page comparison with five lines: total payments over the horizon, estimated end value if buying, excess-mileage risk if leasing, insurance difference, and exit fees. Fill each line with conservative assumptions. The option with the better net wealth outcome and tolerable hassle wins—even if its monthly payment is not the lowest on the salesman whiteboard.",
      "Finally, consider credit and future borrowing. A clean auto loan paid on time can support credit history; a lease payment history also reports in many markets. Neither justifies taking a payment that crowds out retirement contributions or emergency savings. Transport should enable your financial plan, not consume it."
    )
  ),

  "debt-snowball-vs-avalanche": section(
    "Designing a 90-Day Kickoff That Survives Real Life",
    paras(
      "Week one is administrative: list debts, turn on minimum autopay, and freeze new revolving spending except true essentials. Week two picks snowball or avalanche and schedules the surplus transfer for the morning after payday. Week three cuts one recurring want and adds that amount to the surplus. Week four reviews statements to ensure extras hit principal rather than prepaid months.",
      "In days 31–60, add a micro side hustle or overtime block with a rule that 100% of net proceeds hit the target debt. In days 61–90, refinance only if the maths is clean and you will not refill old cards. If motivation fades, clear one tiny balance even inside an avalanche plan—then return to highest rate. Behavioural maintenance is part of the algorithm.",
      "Households with partners should meet monthly for fifteen minutes, not to shame spending, but to confirm the target account and celebrate closed balances. Room-mates sharing a plan can use a shared spreadsheet with balances updated on statement dates. Solo borrowers can join a no-debt community challenge for external accountability without sharing bank logins.",
      "Measure success by closed accounts and falling interest charges, not by whether you picked the theoretically perfect method. A finished avalanche and a finished snowball both beat an elegant spreadsheet that never sees a payment."
    )
  ),

  "emergency-fund-calculator-guide": section(
    "Building Your Own Spreadsheet Calculator",
    paras(
      "Create columns for category, monthly amount, and essential flag. Sum only essential rows into a single cell named Monthly_Base. In another cell, enter Months_Cover as 3, 6, or 9. Target equals Monthly_Base times Months_Cover. Liquid_Now equals the sum of balances you can access within a few days without selling investments. Gap equals Target minus Liquid_Now. Monthly_Save equals Gap divided by your chosen build months.",
      "Add a stress tab: increase groceries 10%, add a medical deductible line, and add COBRA or private insurance continuation if relevant in your country. Recalculate Gap under stress. If the stressed gap feels unreachable, lengthen the build timeline rather than abandoning the project. A twenty-four month build that finishes is superior to a six month plan that never starts.",
      "Inflation-adjust the target annually by multiplying Monthly_Base by one plus expected inflation, or by re-pricing each essential line from current bills. Link a note to your CalcBase inflation calculator outputs so the adjustment is intentional. After any withdrawal, set a temporary Monthly_Save_Refill higher than the maintenance top-up until Liquid_Now returns to Target.",
      "Share the spreadsheet with a partner so both people know the number that means “safe enough to invest surplus again.” Clarity reduces arguments when markets look exciting and cash looks “idle.” Idle cash with a job is insurance, not inefficiency."
    )
  ),

  "fico-vs-cibil-scores-explained": section(
    "How to Read a Credit Report Like a Lender",
    paras(
      "Start with personal identifiers: misspelled names and old addresses can fragment files. Confirm each account’s status, balance, limit, and payment history grid. Look for duplicates of the same loan, settled accounts marked active, and enquiries you do not recognise. Make a three-column list: accurate negatives, fixable errors, and open questions requiring lender documentation.",
      "Utilisation is often misunderstood. It is typically revolving balances divided by revolving limits, and models may emphasise individual cards as well as totals. Paying before the statement date can lower the balance that gets reported even if you later spend again—useful before a mortgage application, not a license for reckless spending.",
      "When comparing FICO and CIBIL conversations online, ignore anyone selling a guaranteed jump. Focus on months of clean history, lower revolving balances, and fewer new accounts. If you are moving countries, understand that scores rarely travel intact; you may need to rebuild local history even with a pristine foreign file.",
      "Before a large loan, freeze or monitor files according to local tools, and avoid co-signing unless you can afford the entire payment. Cosigned debt is your debt in the bureau’s eyes when the primary borrower slips."
    )
  ),

  "good-debt-vs-bad-debt": section(
    "Case Studies: Relabeling Debt After the Fact",
    paras(
      "Case one: a home loan taken at a prudent payment ratio remains productive even when prices soften temporarily, because the household can still pay and stay. Case two: the same sized loan on a speculative second property with short rental history becomes fragile—purpose looked like investment, but cash-flow buffers were missing. Labels follow resilience, not marketing language.",
      "Case three: an education loan for a programme with strong placement data and a clear income step-up plan is easier to defend than borrowing for a vague credential with poor outcomes. Case four: a 0% retail plan that is not paid before the promo ends can morph into expensive deferred interest—bad debt wearing a friendly mask.",
      "Create a one-paragraph debt thesis for every new loan: purpose, rate, payoff date, and what sacrifice funds the payments. If you cannot write the paragraph, do not sign. Review old theses yearly; a car loan that made sense at a stable job may deserve acceleration after a raise, while a low-rate mortgage might not deserve obsessive prepayment if retirement accounts are empty.",
      "Teach teenagers and new graduates the framework early. Distinguishing leverage from lifestyle credit prevents years of avalanche maths later. Good debt is a tool with a manual; bad debt is a subscription to regret."
    )
  ),

  "how-credit-score-affects-mortgage-rate": section(
    "Preparing a Rate-Ready File in Six Months",
    paras(
      "Month one: pull reports, dispute errors, and list utilisation by card. Month two: attack the highest-utilisation revolving account with every surplus dollar while keeping all accounts current. Month three: avoid new hard enquiries and store-card temptations. Month four: confirm that authorised-user scars or benefits are intentional. Month five: ask a lender or broker which score versions and cutoffs they use. Month six: gather competing quotes inside a focused shopping window.",
      "Document income early so underwriting does not scramble later. Large unexplained deposits can delay approvals; keep gift letters ready if family helps with down payment. A better score cannot fix chaotic paperwork.",
      "When comparing rate sheets, compute payment and lifetime interest at each tier using a mortgage calculator. Sometimes improving into the next tier is worth delaying a purchase by one quarter; sometimes property-market or personal timing makes waiting costlier than a slightly higher rate. Make that trade-off explicit rather than emotional.",
      "After closing, keep the habits that earned the rate. Future refinance opportunities are easier when the file stays clean. A mortgage is a multi-year relationship with your payment behaviour, not a one-day score event."
    )
  ),

  "how-inflation-affects-your-savings": section(
    "Assigning Jobs to Cash, Bonds, and Growth Assets",
    paras(
      "Cash’s job is liquidity and stability for near-term needs. It will often lag inflation; that is the fee you pay for optionality. Short bonds or deposits can improve yield for intermediate goals while keeping volatility modest. Growth assets’ job is long-term purchasing-power expansion, accepting drawdowns along the way.",
      "Build a map: 0–2 year goals in cash-like instruments, 3–7 year goals in balanced or intermediate vehicles suited to your risk, and 8+ year goals with diversified equity exposure if appropriate. Revisit when inflation regimes shift, but avoid abandoning a sound map because one CPI print was hot.",
      "Salary negotiations and career investment are underrated inflation hedges. A skill that raises income 8% can outpace many portfolio tweaks. Simultaneously audit subscriptions and vendor contracts that auto-increase annually; personal inflation control is part of the strategy.",
      "When deposits finally offer higher nominal yields after hiking cycles, compare them to inflation after tax before declaring victory. A 6% taxable yield in 5% inflation with meaningful tax drag may still be flat in real terms. Do the arithmetic with current numbers, not slogans from a previous decade."
    )
  ),

  "how-loan-eligibility-is-calculated": section(
    "Documents and Signals That Quietly Raise or Lower Offers",
    paras(
      "Clean bank statements without frequent overdrafts, stable salary credits, and modest cash withdrawals for undocumented spending help underwriters trust your income story. Multiple EMI bounces, gambling merchant codes, or last-minute large debt payoffs that look like window dressing can hurt even when ratios appear fine on a calculator.",
      "Self-employed applicants should prepare profit-and-loss summaries, tax returns, and explanations for one-off income spikes. Lenders haircut variable income for a reason: eligibility must survive an average year, not your best quarter. Adding a co-applicant helps only when that person has real, documented capacity and understands joint liability.",
      "Property documents for secured loans—title clarity, valuation, occupancy type—can cap LTV independently of income. A pristine salary profile cannot force a lender past policy on an ineligible property. Shop homes inside both constraints.",
      "Before applying widely, run a soft-eligibility conversation with one lender and fix ratio issues: close a tiny auto loan, pay down card dues, or postpone a new gadget EMI. Each obligation removed expands headroom more predictably than begging for exceptions."
    )
  ),

  "how-personal-loan-emi-is-calculated": section(
    "Fees, APR, and Prepayment: The Fine Print That Changes Cost",
    paras(
      "A processing fee of 2% on a ₹5 lakh loan means you may receive ₹4.9 lakh while still paying EMIs on ₹5 lakh if the fee is deducted from disbursal. That raises the effective cost above the headline rate. Optional insurance bundled into the loan increases principal and interest unless you truly need and price it separately.",
      "Ask for APR or effective rate comparisons when available, and always request a full schedule. If two lenders show similar EMIs but different fee stacks, the schedule and total payable reveal the winner. Prepayment rules matter if you expect a bonus: some products allow partial prepay free after a lock-in; others charge penalties that erase the benefit of early payoff.",
      "When consolidating card debt into a personal loan, compute the crossover month where total interest saved exceeds fees. Then cut up the behavioural path that filled the cards—otherwise you may hold a personal loan and new card balances simultaneously, the worst of both worlds.",
      "Revisit EMI affordability under a temporary income drop. If a three-month job gap would break the payment plan, shrink the principal or extend only as far as necessary. EMI maths without cash-flow stress testing is incomplete."
    )
  ),

  "how-to-calculate-mortgage-payment": section(
    "Sensitivity Tables: Rate, Term, and Extra Principal",
    paras(
      "Build a small table with rates 0.5% above and below your quote and terms of 15, 20, and 30 years (or 10, 15, and 20 for shorter markets). Compute P&I for each cell. The exercise shows why a seemingly minor rate gap changes payment more on larger principals, and why shorter terms raise EMI while crushing total interest.",
      "Next, model an extra ₹5,000 / $100 / £100 per month applied to principal from year one. Even without changing the contractual EMI, the balance path bends downward and the payoff date moves earlier. Lenders differ on whether extras shorten term or periodically recast payment—confirm before celebrating.",
      "For floating-rate loans, recalculate the formula at each assumed reset rate and decide whether you would prefer EMI increases or tenure increases if the bank offers a choice. Knowing your preference in advance prevents panic when the first revision letter arrives.",
      "Finally, reconcile manual maths with the lender’s disclosure. If they diverge by more than rounding, check whether taxes and insurance are included, whether rate is nominal versus offered differently, or whether payment frequency is not monthly. Literacy means catching mismatches early."
    )
  ),

  "how-to-negotiate-lower-mortgage-rate": section(
    "Points, Credits, and Lock Strategy Without the Jargon Fog",
    paras(
      "Discount points are upfront fees paid to lower the rate. Lender credits do the opposite: you accept a higher rate in exchange for help with closing costs. Neither is magic; both are trade-offs along a pricing curve. Calculate how many months of payment savings recover points using your expected stay in the home or until you might refinance again.",
      "Lock periods protect a quoted rate for a set time while underwriting finishes. If your transaction is complex, a longer lock may cost more but prevent heartbreak if markets jump. Float-down features, when offered, can help if rates fall after lock—read conditions carefully so you do not assume flexibility that does not exist.",
      "Negotiation scripts work best when you mirror identical product structures: same term, approximate LTV, same points level, same lock length. Ask the preferred lender to match the competitor’s rate and waive a specific fee line. Accepting a partial win still compounds over a long amortisation.",
      "Keep emotion out of brand loyalty. A bank that holds your salary account may price well—or not. Let the worksheet decide, then use relationship status as a final tie-breaker if numbers are equal."
    )
  ),

  "how-to-pay-off-student-loans-faster": section(
    "Income Surges, Employer Help, and Refinancing Guardrails",
    paras(
      "Promotion years and vesting bonuses are prime acceleration fuel if you pre-commit percentages before the money hits your account. A rule like “50% of every bonus to the highest-rate student loan, 30% to emergency top-up, 20% to celebration” prevents lifestyle creep from absorbing the windfall.",
      "Ask HR about tuition assistance or student-loan repayment benefits. Some employers contribute monthly; missing that paperwork is leaving free principal reduction on the table. Keep copies of how contributions are reported for taxes.",
      "Refinancing guardrails: only move government-linked loans into private terms if you fully understand lost flexibility, and only when the rate drop is material after fees. If your income is unstable, preserving hardship options may beat a slightly lower rate. Run both scenarios with an EMI calculator and a written pros/cons list.",
      "For households with multiple education debts across spouses, decide whether to attack one person’s highest rate jointly or keep separate scoreboards. Joint focus often clears a balance faster and improves household cash flow for the next target."
    )
  ),

  "how-to-rebuild-credit-score-fast": section(
    "A Practical Communication and Documentation Toolkit",
    paras(
      "When disputing errors, send clear letters or portal submissions with account numbers, the inaccuracy, and supporting PDFs. Keep a log of dates and reference numbers. Follow up if the investigation window passes without results. Accurate negatives will remain; the win is removing what should never have been there.",
      "For isolated late payments after an otherwise clean history, a polite goodwill request to the original creditor can occasionally re-age or remove a mark—success is uneven and never guaranteed. Continue perfect payments regardless of the answer.",
      "If identity theft contributed to the damage, use the official fraud-reporting and freeze tools in your country promptly. Rebuilding is harder while new fraudulent accounts still open. Secured cards from mainstream banks, used lightly and paid in full, can restart revolving history after freezes lift.",
      "Avoid “rapid rescore” marketing unless a reputable mortgage professional explains a legitimate, bureau-supported process tied to a live application. Most social-media score hacks are either mundane utilisation tips or outright scams. Fundamentals plus time remain the durable path."
    )
  ),

  "how-to-save-for-a-house-down-payment": section(
    "Geo Strategy, Partner Alignment, and Cash-Flow Sprints",
    paras(
      "Sometimes the fastest down-payment strategy is geographic: targeting a slightly different postcode, property type, or commute trade-off that lowers the required cash by more than a year of scraping. Run mortgage payments at today’s rates for each band so you do not “save successfully” for an unaffordable EMI.",
      "Partners should align on timeline, must-have features, and maximum payment before one person silently sabotages the savings rate with lifestyle upgrades. A joint house fund with automatic contributions proportional to income can feel fairer than equal cash when salaries differ.",
      "Cash-flow sprints work: a six-month period of aggressive cuts with a defined end date psychologically beats an endless austerity mood. At the end, keep a fraction of the elevated savings rate permanently so progress does not reset to zero.",
      "As you near the purchase window, migrate money from market-exposed vehicles into stable cash so a drawdown does not delay closing. Underwriters will want to see sourcing of deposits; keep gift trails and sale-of-asset paperwork organised early."
    )
  ),

  "impact-of-interest-rates-on-finances": section(
    "A Household Playbook for Hiking and Cutting Cycles",
    paras(
      "In a hiking cycle, prioritise floating-rate affordability, delay non-essential leveraged purchases, and shop deposit rates as banks reprice. Refinance only when break-even still works. In a cutting cycle, avoid assuming the floor is permanent; use lower payments to accelerate principal or rebuild buffers rather than immediately expanding lifestyle lock-ins.",
      "Investors should remember that bond prices and equity valuations respond to rate expectations, sometimes before the central bank announcement. A written investment policy prevents whipsaw trading at each meeting. Rebalance on schedule, not on headlines.",
      "Small businesses and freelancers should revisit invoice timing, credit lines, and customer financing offers when rates jump. The personal and business balance sheets often share the same human stress—treat them as linked.",
      "Create a one-page “rate dashboard” listing each liability’s type, reset date, and stress EMI. Update it whenever you open or close credit. Awareness converts macro news into specific actions instead of ambient anxiety."
    )
  ),

  "inflation-impact-on-long-term-mortgages": section(
    "Maintenance, Taxes, and the Hidden Inflation Inside Ownership",
    paras(
      "Even with a perfectly fixed principal-and-interest payment, ownership costs drift upward: roofs, boilers, society maintenance, insurance premiums, and property taxes. Budget a maintenance reserve as a percentage of property value each year so inflation in those lines does not force credit-card emergencies.",
      "If wages stagnate while ownership costs inflate, the classic “fixed mortgage gets easier” story weakens. Career investment and geographic flexibility remain part of mortgage resilience. Dual-income households should model a one-income scenario for a year of stress.",
      "Cash-out refinancing during inflationary booms can feel like harvesting gains, yet it may reset amortisation and increase rate risk just as policy tightens. Prefer selling decisions and renovation ROIs that stand without optimistic inflation assumptions.",
      "Renters considering a buy decision during high inflation should compare expected rent growth to mortgage rate risk explicitly. Sometimes buying hedges housing inflation; sometimes it concentrates risk. Local vacancy, supply pipelines, and your horizon decide more than national slogans."
    )
  ),

  "mutual-funds-vs-etfs": section(
    "Cost Layers, Behaviour, and a Simple Selection Worksheet",
    paras(
      "List every cost layer: expense ratio, platform fees, bid-ask spreads, loads, and tax frictions. A slightly higher expense ratio on a mutual fund you will automate may still beat a cheaper ETF you never buy because the process is clumsy on your platform. Behavioural completion is a cost input.",
      "Worksheet columns: goal horizon, account wrapper, automation quality, total annual cost estimate, diversification breadth, and tracking difference. Score honestly. The winner is usually a broad market product with clean automation—not a niche theme with exciting marketing.",
      "Rebalancing between funds and ETFs should be rare and purposeful. Taxable accounts especially punish restless switching. Inside tax-advantaged wrappers, you still want to avoid gaps where money sits idle for months during an unfinished migration.",
      "Educate household members on the plan so a temporary market drop does not trigger a wrapper debate. The mutual-fund-versus-ETF argument is secondary when the real threat is panic selling."
    )
  ),

  "pros-and-cons-of-refinancing-home": section(
    "Cash-Out, Term Resets, and When Not to Touch the Loan",
    paras(
      "Skip refinancing when you will move soon, when fees erase savings, or when the only benefit is a slightly lower EMI created by stretching the term after many years of paydown. Extending debt into your planned retirement years deserves an explicit yes, not an accidental byproduct of fee-financed “savings.”",
      "Cash-out can be rational for high-ROI essential repairs or consolidation of genuinely costlier debt with a written payoff of the old accounts. It is rarely rational for weddings, gadgets, or speculative trading. Your home is collateral; treat it with more respect than an unsecured line.",
      "If your credit is mid-repair, improve the file for a few months before refinancing large balances—rate tiers may move more than you expect. If your equity is thin, appraisal risk can kill the deal after you spend application money; get a realistic value check first.",
      "Product transfers with an existing lender sometimes beat a full refinance when the friction is lower. Still compare the external market. Loyalty discounts are real; inertia pricing is also real."
    )
  ),

  "sip-vs-fd-which-is-better": section(
    "Tax, Laddering, and Goal-Based Allocation Examples",
    paras(
      "Laddering FDs—splitting cash across 3, 6, 12, and 24 month deposits—creates periodic liquidity without placing everything at today’s reinvestment rate forever. SIPs can be laddered by goal: a short-debt-fund SIP for a five-year target and an equity SIP for retirement. The products cooperate when goals are labeled.",
      "Tax treatment can flip apparent winners. An FD with a high headline rate may trail a more tax-efficient investment wrapper after levies, or vice versa depending on your slab and country rules. Recompute with current law rather than memorised advice from forums.",
      "Example allocation for a dual-goal year: six months of expenses in liquid/FD instruments, a house down-payment timeline under three years mostly in capital-preservation vehicles, and retirement contributions via equity-oriented SIPs. Argue less about SIP versus FD in the abstract; argue about which bucket you are funding today.",
      "When FD rates spike in a hiking cycle, it is reasonable to lock some near-term money while continuing long-term SIPs. When FD rates fall, resist the urge to chase equity with money you still need soon. Horizon discipline beats yield chasing."
    )
  ),

  "the-ultimate-guide-to-fire-movement": section(
    "Withdrawal Flexibility, Healthcare, and Life After the Number",
    paras(
      "Rigid withdrawal rules break when markets fall early in retirement. Flexible spending—cutting discretionary costs after bad return years—improves sustainability more than debating 3.5% versus 4% on a forum. Keep a cash bucket for near-term spending so you are not forced to sell equities at the bottom.",
      "Healthcare planning deserves its own spreadsheet tab: premiums, deductibles, geographic options, and ageing parents. A FIRE number that ignores medical inflation is incomplete. So is a plan that ignores housing—owned outright, mortgaged, or rented—with realistic maintenance.",
      "Life after work needs structure: community, movement, and optional projects. Some FIRE followers return to part-time meaningful work not because the maths failed, but because identity needs a place to go. Build that muscle before you resign.",
      "Revisit the plan every year with updated spending, portfolio values, and inflation. Independence is a living system, not a one-time crossing of a finish line posted on social media."
    )
  ),

  "understanding-auto-loan-amortization": section(
    "Prepayment, Refinancing, and Depreciation-Aware Timing",
    paras(
      "If your auto rate is high, prepaying may beat investing the surplus after emergency savings exist. Instruct the lender to apply extras to principal and request an updated schedule. Refinancing a car loan can help when credit improved and equity exists, but fees and remaining term must cooperate.",
      "Depreciation-aware timing means not buying new at peak sticker prices with tiny down payments just as you enter a long amortisation. A quality used car with a shorter loan often builds a healthier equity path. Calculate the all-in cost per month of reliable transport, including fuel and insurance, not just EMI.",
      "When trading in early, ask for the payoff letter and compare it to the trade offer. The gap is cash you must bring or roll. Rolling repeatedly is how amortisation schedules become traps across successive vehicles.",
      "If you lease instead, remember you are not amortising toward ownership in the same way; different maths apply. Choose consciously rather than mixing mental models at the dealership desk."
    )
  ),

  "understanding-cryptocurrency-beginner-guide": section(
    "Security Hygiene and Scam Patterns Beginners Must Recognise",
    paras(
      "Protect seed phrases offline; never type them into websites that appear after a search for “wallet reconnect.” Bookmark official domains. Enable withdrawals allow-lists where exchanges offer them. Start with small test withdrawals before moving meaningful sums.",
      "Scam patterns include guaranteed-return investment clubs, romance-to-crypto pipelines, fake tech-support takeovers, and airdrop sites requesting unlimited token approvals. If urgency and secrecy are demanded, exit the conversation. Legitimate support does not need your seed phrase.",
      "Tax hygiene: record dates, amounts, fees, and fair-market values for taxable events according to your country’s rules. Whipsaw trading without records becomes painful at filing time. Some jurisdictions also impose specific transfer taxes—verify before frequent moving of coins between platforms.",
      "Educational continuing path: learn how on-chain transactions work with tiny amounts, read reputable security guides, and only then consider whether a small speculative allocation fits your plan. Curiosity is healthy; leverage and borrowed money are not beginner tools."
    )
  ),

  "understanding-fixed-vs-floating-rates": section(
    "Break Costs, Caps, and Remortgage Calendars",
    paras(
      "Leaving a fixed rate early can trigger break costs or penalties that erase the benefit of switching. Ask for the calculation method before you assume mobility. Floating loans may allow cheaper prepayment but introduce payment uncertainty—read both fee schedules.",
      "ARMs and capped products deserve a maximum-rate scenario. If the cap still breaks your budget, the product is too risky regardless of the attractive teaser. Caps limit damage; they do not make every variable loan affordable.",
      "Build a remortgage or reset calendar with reminders 120 and 60 days before fixed periods end. Use that window to compare offers calmly. Borrowers who wait until the reversion letter arrives negotiate from panic.",
      "Households with multiple loans should avoid fixing everything on the same day if possible, so rate risk is staggered. Diversity of reset dates is an underrated stability tool alongside diversification of assets."
    )
  ),

  "understanding-the-stock-market-for-beginners": section(
    "Account Setup, First-Year Curriculum, and Emotional Rules",
    paras(
      "First-year curriculum: understand what a share is, how funds differ from single stocks, how fees compound, and how your tax wrapper works. Practise with automatic contributions before attempting stock picking. Read annual reports only after you can explain diversification in your own words.",
      "Emotional rules to write down: I will not check prices daily; I will not invest money needed within three years; I will not increase risk after a winning streak to “make more faster”; I will not sell my entire diversified portfolio because of one scary headline. Sign the rule sheet.",
      "Account setup checklist: verified identity on a regulated platform, beneficiary designations where available, two-factor authentication, and a separate emergency fund already funded. Markets are optional until cash buffers exist.",
      "Measure first-year success by consistency of contributions and clarity of process—not by beating an index. Skill grows; luck dominates short windows. Beginners who adopt patient systems usually outperform beginners who adopt loud opinions."
    )
  ),
};
