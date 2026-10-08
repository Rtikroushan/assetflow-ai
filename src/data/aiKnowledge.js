export const quickPrompts = [
  "Which assets are currently in maintenance?",
  "Show laptops assigned to Engineering",
  "What is our total asset valuation?",
  "Check warranty expiry status for mobiles",
];

export const smartKnowledge = [
  {
    keywords: ["maintenance", "repair", "broken", "issue"],
    response:
      "Currently, **HP LaserJet (AST-1004)** is under active maintenance for fuser roller repair in Delhi. Additionally, **MacBook Pro 16 (AST-1009)** has an open diagnostic ticket with Apple Authorized Service.",
  },
  {
    keywords: ["laptop", "engineering", "macbook", "xps"],
    response:
      "Engineering currently holds **MacBook Pro 14 (AST-1001)** assigned to Rahul Sharma, and **Dell XPS 15 (AST-1002)** assigned to Priya Singh in Design. Both are operating within healthy diagnostic thresholds.",
  },
  {
    keywords: ["valuation", "worth", "cost", "total value", "price"],
    response:
      "Our registered enterprise assets have an aggregated gross book value of **₹5,39,000**. Hardware assets account for 82% of value, followed by mobile devices (18%).",
  },
  {
    keywords: ["warranty", "expir", "mobile", "iphone"],
    response:
      "Alert: **iPhone 15 Pro (AST-1005)** held by Amit Kumar has its manufacturer AppleCare warranty expiring in **14 days**. Recommended action: Initiate warranty extension or renewal via IT procurement.",
  },
];

export const welcomeMessage = {
  type: "ai",
  text: "Hello Admin! I'm your **AssetFlow AI Intelligence Agent**. I have direct telemetry into all enterprise hardware, active assignments, and service maintenance queues. How can I assist you today?",
};

export const resetMessage = {
  type: "ai",
  text: "Conversation refreshed. What telemetry or asset analytics would you like to review?",
};

export function getAIReply(text) {
  const lower = text.toLowerCase();
  const match = smartKnowledge.find((item) =>
    item.keywords.some((k) => lower.includes(k))
  );

  return match
    ? match.response
    : `Analysis complete for: "${text}". Query processed against current inventory database. No SLA violations detected. You can also view granular asset records under the Assets or Reports module.`;
}
