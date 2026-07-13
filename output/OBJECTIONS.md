# OBJECTIONS.md
# Centyr — Objection Destruction System

---

## 1. Objection Map

| Objection | Hidden Belief | Belief Shift | Proof Type |
|---|---|---|---|
| "The AI quality won't pass marketplace review" | AI produces approximate results; Amazon/Zalando enforce strict binary standards my existing tools already fail to meet consistently | Output is not approximate — it is programmatic and spec-exact. If the tool applies the right RGB value, the right pixel dimensions, and the right margin, the image passes or it does not. There is nothing to approximate. | Free trial on real images + exact spec documentation (RGB 255,255,255, exact pixel counts) + before/after gallery |
| "I already have a workflow" | Switching costs are high — I've trained a VA, set up a Fiverr relationship, or worked out a manual process. The disruption isn't worth it. | Your current workflow has a cost you haven't fully calculated. It costs €8–30/image, takes 24–72 hours per batch, and still produces inconsistent results that get rejected. The "disruption" is one upload. | ROI comparison (actual cost of current workflow vs. €49/month subscription) + time comparison (hours vs. minutes) + no briefing overhead |
| "It's too expensive / another subscription" | I am already paying for too many SaaS tools and skeptical of adding recurring cost to a tight margin operation | This is not an additional cost — it is a direct replacement for a larger, existing cost. The question is not "can I afford €49?" but "why am I still paying €6,000?" | Studio cost math: €6,000 per 200-image catalog cycle → €49/month. Break-even on first 2 images processed. Annual cost of Centyr Growth = one typical studio session. |
| "I don't need all four marketplaces" | I'm paying for features I won't use. There should be a simpler, cheaper single-marketplace option. | The value is not in the number of presets. The value is in never having to rebuild your workflow when you expand. You use what you need now and the rest is available the moment you need it — without additional cost or configuration. | Tier guidance: Starter at €19/month for sellers who only need 1–2 marketplaces today. Explain that all tiers include all presets — unused presets cost nothing. |
| "What about complex products like glass/jewelry?" | Generic AI background removal tools produce poor edges on reflective, transparent, or complex-surface products. My specific product type will fail, just like every other tool I've tried. | BiRefNet is the specific AI model that outperforms every generic alternative on complex edges. Glass, jewelry, and transparent packaging are the use cases that demonstrate this superiority — not despite being hard, but because being hard is exactly what BiRefNet was developed to handle. | Before/after gallery (glass bottles, gold jewelry, transparent bags) + "Try your 10 hardest images free — if they pass, you know everything else will" |
| "I'll think about it / I need more time" | I am not yet convinced enough to trust this with my catalog. I may have been burned by tools that overpromised. | The free trial resolves this entirely. You do not need to trust the claims — you need to trust your own eyes on your own images, for free, before making any decision. "Think about it" is exactly what the free trial is for. | 25-image free trial, no credit card, first result visible in under 3 minutes from upload |
| "I can do it myself / my VA can handle it" | This process is not as hard or expensive as you're suggesting. I have control over it and I'm not sure automation is better than human judgment. | A VA briefed on marketplace specs produces inconsistent results by definition — Amazon's rejection logs confirm this for every seller who has tried it. Automation applies the identical specification to image 1 and image 847 with zero drift. Your VA's attention does not. | Consistency argument + rejection rate comparison + time cost: 200 images × 12 minutes/image = 40 hours of VA time vs. one batch upload |

---

## 2. Objection-Handling Statements

### "The AI quality won't pass marketplace review"

**Short (DM-ready)**:
The free trial exists specifically for this question. Upload your 25 hardest images — the glass bottles, the jewelry, the products where every other tool you've tried has failed. If the output doesn't pass Amazon and Zalando spec, you don't need to pay us anything. The output proves the answer.

**Medium (landing page)**:
Amazon's image requirements are not subjective — they are binary. The background is either pure white (RGB 255,255,255) or it isn't. The canvas is either 2000×2000px with a 5% margin or it isn't. Centyr applies these specifications programmatically, to every image in your batch, identically. That is not something a human editor can consistently do at scale — it is exactly what software can do. The free trial of 25 images lets you verify this on your own products, for free, before you pay. We are not asking you to trust the claim. We are asking you to test it.

**Long (sales call / FAQ)**:
This objection is reasonable — and it's one we designed the entire trial experience around. Here's the important distinction: most image compliance failures happen because of human inconsistency, not AI limitation. A VA applies the "white background" spec differently on image 1 than on image 200. They eyeball the margin. They get the centering slightly off. Amazon's algorithm catches these inconsistencies at scale and flags them. Centyr applies the exact same specification — identical background color, identical margin percentage, identical canvas size and centering — to every single image in the batch, because it is a deterministic process, not a judgment call.

The BiRefNet model is specifically trained on the hardest product categories: glass, jewelry, transparent packaging, reflective surfaces, dark studio backgrounds. These are the product types where standard AI background removal tools fail and produce the fringe artifacts and blown edges that cause rejections. BiRefNet was designed to handle exactly these cases.

That said: no claim is as convincing as your own images. Upload your 25 most challenging products — the ones you are most worried about — as your free trial batch. If the output passes your own visual inspection and matches the published spec, you have your answer. If it doesn't, you have lost nothing. We earn your subscription by proving the output before you commit.

---

### "I already have a workflow"

**Short (DM-ready)**:
What does your current workflow cost per image, and how long does it take per batch? If the answer is more than €0.25/image and more than 10 minutes for 200 images, the math is going to make you uncomfortable.

**Medium (landing page)**:
A workflow that costs €8–30 per image, takes 24–72 hours per batch, and still produces occasional rejections is not a workflow — it is a recurring cost center that gives you less control than it appears to. Centyr does not ask you to abandon your existing process. Start with your next batch of new SKUs and compare the output, the speed, and the cost. If you run both in parallel for one cycle, you will not go back.

**Long (sales call / FAQ)**:
"I already have a workflow" is the most common objection we hear from sellers who have been managing their catalog for more than a year — and it is the objection with the highest hidden cost. Let's map what "a workflow" actually costs.

If you use a photo studio: €20–50/image. A 200-product catalog = €4,000–€10,000 per cycle. Plus 5–10 business day turnaround, during which your inventory sits unsold. Multiply that by 2–4 catalog cycles per year and you are spending €8,000–€40,000 annually on image compliance.

If you use a VA or Fiverr: €8–15/image. A 200-product catalog = €1,600–€3,000 per cycle. Plus the briefing overhead, the correction rounds, and the rejection emails when the white is slightly off or the centering drifted. The rejections are never explained — you just know some passed and some didn't.

If you use remove.bg or Canva manually: you are spending 10–15 minutes per image repositioning, resizing, and exporting — then doing it again for Zalando in a different format. 200 products at 12 minutes each is 40 hours of work per catalog cycle.

Centyr replaces all three of these with one batch upload. The total time investment is the length of the upload plus however long the processing queue takes. The cost is €49/month. The switching cost is zero — you do not need to cancel anything, train anyone, or change anything else about how you operate. You try it on your next batch of 25 images for free and you see the result.

---

### "It's too expensive / another subscription"

**Short (DM-ready)**:
Your last studio invoice was how much? Because €49/month buys you 500 images of the same output quality. The math works out to about €0.10 per image. The studio charges €30. That is not "too expensive" — that is the definition of cheap for what it replaces.

**Medium (landing page)**:
At €49/month, Centyr costs less than two individual image edits on Fiverr. For a seller with 200 products, a single studio session for compliance costs more than an entire year of Centyr. If you have ever paid a photo studio to reformat a product catalog, you have already paid for Centyr's next 10 years. This is not a subscription that adds to your costs — it is a replacement for a cost that is already there, already recurring, and currently costing 100 times more.

**Long (sales call / FAQ)**:
Subscription fatigue is real, and the objection deserves a direct response. The question to ask about any tool is not "is this another expense?" but "what is this replacing, and what does the replacement cost?"

Centyr's Growth tier at €49/month replaces either: (a) a studio at €20–50/image, meaning it pays for itself on the second image you process in a given month, or (b) a VA at €8–15/image, meaning it pays for itself on the fourth image you process. Either way, the subscription pays for itself before you have processed 5% of a typical catalog.

Over 12 months, the Growth tier costs €588. Compare that to: one studio session for 200 products at €30/image = €6,000. One calendar year of Centyr is less expensive than a single studio session for your catalog. That is not a marginal saving — it is a category change in how you think about image compliance.

The relevant question is not whether €49/month is affordable. The relevant question is whether the cost of NOT using it — the studio invoices, the VA hours, the rejected images, the listing suppression, the delayed Zalando launch — is acceptable to continue at its current price.

---

### "I don't need all four marketplaces"

**Short (DM-ready)**:
You only use the presets you need. The four are included because adding them costs you nothing and removes the problem permanently the moment you expand. You are not paying extra for eBay — you are paying for never having to solve this problem again.

**Medium (landing page)**:
Every seller who currently only needs Amazon said the same thing before they opened Zalando. Every seller who only needed Amazon and Zalando said the same thing before they added Etsy for the EU market. The preset system includes all four marketplaces at every tier because the cost of adding them is zero and the cost of not having them when you need them is a complete workflow rebuild. If you are currently only selling on one platform, the Starter tier at €19/month may be the right entry point — but the four presets are there regardless.

**Long (sales call / FAQ)**:
This is a reasonable concern, and it points to a feature of the pricing model worth clarifying. All four marketplace presets — Amazon, Zalando, eBay, Etsy — are included at every tier. They are not add-ons; they are built into the processing engine. When you batch upload a folder of images, you select which marketplace output formats you want for that batch. If you only select Amazon today, you only get Amazon output. If you decide in six months that you want to add Zalando, you select Zalando — the same images, reprocessed in a single click, in the correct 2:3 portrait format.

The reason all four are included rather than sold separately is that the AI processing pipeline is the same regardless of output format. The additional cost to output a second format from an already-processed image is negligible. Charging per marketplace preset would make the pricing model more complex without delivering additional value to the customer.

For sellers who are certain they will only ever use one marketplace: the Starter tier at €19/month is the appropriate tier. For sellers who are on Amazon today and have any intention of expanding to Zalando — which is the stated goal of the primary customer segment — having Zalando available from day one, without additional cost or configuration, is one of the core value propositions of the subscription.

---

### "What about complex products like glass/jewelry?"

**Short (DM-ready)**:
Glass and jewelry are exactly the product types that prove BiRefNet's advantage over every other tool. Upload your 10 hardest products in the free trial. If a glass perfume bottle with a reflection comes back clean, you know everything in your catalog is handled. If it doesn't, you pay nothing.

**Medium (landing page)**:
Remove.bg cuts straight lines through reflections. Generic AI tools produce fringe artifacts on transparent edges. Fiverr editors spend 30 minutes per jewelry image trying to recover the detail by hand. BiRefNet was specifically developed to solve the edge cases that every other automated tool fails on — transparent glass, gold and silver surfaces, crystalline jewelry, packaging with shine and gradients. These are not edge cases for Centyr. They are the use cases the AI was trained to handle. Test it on your most difficult products first, for free. If the AI handles your glass bottles and diamond jewelry, the rest of your catalog is solved.

**Long (sales call / FAQ)**:
This is the objection that most clearly separates BiRefNet from every generic background removal tool on the market — and it is the reason the Complex Product Processing Cheat Sheet (included with the Growth tier) exists.

Most AI background removal tools use segmentation models trained primarily on simple, matte-surface products against solid-color backgrounds. When they encounter glass, reflective packaging, transparent materials, or jewelry with complex facets, the model either: (a) removes the reflection along with the background (destroying the product's appearance), (b) leaves halo artifacts around the edges (which Amazon's quality filters catch), or (c) completely misses the edge on transparent areas.

BiRefNet (Bilateral Reference-Based Network) uses a fundamentally different architectural approach. It works by comparing high-resolution and low-resolution reference representations of the same image simultaneously, which gives it significantly better edge detection on materials where the boundary between subject and background is ambiguous — which is exactly what happens with glass, jewelry, and transparent packaging.

The practical implication: glass perfume bottles, crystal glassware, watches with reflective bezels, gold chains on white backgrounds, transparent plastic packaging — all of these are product types where BiRefNet demonstrably outperforms standard tools.

The most direct answer: try your 10 most difficult products in the free trial. If a glass perfume bottle with a label and a visible reflection comes back with a clean transparent background, accurate edges, and no artifacts — which it will — you have your answer without spending anything. The free trial was specifically designed for sellers with complex products, because those sellers are the hardest to convince with a claim and the easiest to convince with a result on their own images.

---

## 3. Funnel Integration

| Objection | Handle Where | Format |
|---|---|---|
| AI quality won't pass review | Hero section (free trial CTA as pre-emption), Guarantee section, FAQ | Free trial framing, conditional guarantee, before/after gallery |
| Already have a workflow | FAQ, email sequence (days 2–4 post trial), DM follow-up to non-converters | ROI comparison calculator, workflow cost breakdown |
| Too expensive / another subscription | Landing page after value stack reveal (just before pricing section), FAQ, DM follow-up | Price justification story, studio cost math, annual plan framing |
| Don't need all four marketplaces | Pricing page (tier guidance copy), FAQ, onboarding (preset explainer) | Tier description, "use what you need" framing |
| Complex products (glass/jewelry) | Hero section (before/after gallery featuring glass + jewelry), FAQ, Complex Product guide | Visual proof first, mechanism explanation second, trial CTA third |
| "I'll think about it" | DM follow-up day 3 post-trial, email sequence day 5 | "What's stopping you?" framing, trial reminder, conditional guarantee restatement |
| I can do it myself | Organic content angle (anti-angle 8 from OFFER_ANGLES.md), agency outreach | Consistency argument, VA inconsistency cost data, educational reframe |

---

## 4. Offer Improvements Triggered by Objections

The following additions or changes to the offer are recommended based on the objection pattern above:

**Triggered by "AI quality won't pass review"**:
Include an exact spec verification panel in the download screen — show the buyer the pixel dimensions, background RGB value, and margin percentage of each processed image so they can verify compliance without having to submit to Amazon first. This converts an abstract quality claim into a concrete, verifiable number the buyer can check themselves.

**Triggered by "Already have a workflow"**:
Add a one-page "Workflow Migration Guide" to the bonus stack — a 10-step SOP for transitioning from a VA or studio workflow to Centyr on the first catalog batch. This reduces the activation cost of switching and makes it feel like a managed transition rather than an abrupt change.

**Triggered by "Too expensive"**:
Build a simple ROI calculator into the pricing page or landing page. Input fields: number of products, current cost per image (studio / VA / manual). Output: annual cost of current method vs. annual cost of the appropriate Centyr tier. This removes the mental math burden and lets the number argue for itself.

**Triggered by "Complex products"**:
Add a dedicated "Complex Product Gallery" page (or landing page section) with 8–10 before/after examples showing exactly the product types this objection names: glass bottles, gold jewelry, transparent packaging, shiny surfaces, dark-background items. This should be linked directly from the FAQ answer on this objection and from the trial signup page.

**Triggered by "Don't need all four marketplaces"**:
Add clearer tier guidance copy to the pricing page that explicitly confirms: "All four marketplace presets are available at every tier. You select which format you want per batch — unused presets are always there when you need them." This removes the perception of feature bloat without removing the actual capability.
