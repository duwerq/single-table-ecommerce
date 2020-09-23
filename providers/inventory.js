import uuid from 'uuid/v4'

let inventory = [
    {
      categories: [
        "sustainable"
      ],
      name: "Soothing Bath Treatment",
      description: "Aveeno's bath treatments are made of 100% pure colloidal oatmeal, which can help relieve itchy skin to due eczema. Our experts like that the packaging and ingredients are sustainably sourced. Plus, its manufacturing process produces lower levels of greenhouse gases (a factor in climate change) and generates reduced industrial and hazardous waste.",
      brand: "AVEENO",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583782473-41kRMdWZHsL.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$4.99",
      currentInventory: 12
    },
    {
      categories: [
        "sustainable"
      ],
      name: "Whole Blends Shampoo",
      description: "This shampoo is formulated to tame frizzy hair and smooth each strand — and it's backed by the GH Seal! The coconut oil and cocoa butter used are purchased fairly and sustainably to support local farmers and communities. The bottle is made with 30% post-consumer recycled material. Pair it with the matching Whole Blends conditioner.  ",
      brand: "GARNIER",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583782578-41SisOATe0L.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$20.49",
      currentInventory: 12
    },
    {
      categories: [
        "sustainable"
      ],
      name: "Glossy Lipstick",
      description: "This glossy lipstick is formulated with moringa oil and red raspberry oil, so it'll moisturize your lips and provide rich color. It doesn’t come with unnecessary packaging (like secondary boxes), and the tube is made with 52% recycled plastic. It’s lighter than other lipsticks since it doesn't contain any metals or magnets — that means it has less of a carbon footprint during transportation.",
      brand: "BURT'S BEES",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583782690-1581529959-eco-friendly-products-burts-bees-lipstick-1581529920.jpg?crop=1xw:1xh;center,top&resize=480:*",
      price: "$79.00",
      currentInventory: 12
    },
    {
      categories: [
        "sustainable"
      ],
      name: "2-in-1 Shampoo and Conditioner Bar",
      description: "Designed to add volume to thin hair, this 2-in-1 product reduces the need to purchase shampoo and conditioner separately. Our pros say that bars have much less water content in comparison to liquid shampoo and conditioners, which can contain 50% or more water. Less water content means that it helps preserve water resources.",
      brand: "LOVE BEAUTY AND PLANET",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583782798-51-aRo-MFNL.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$69.50",
      currentInventory: 12
    },
    {
      categories: [
        "sustainable"
      ],
      name: "Atlantic Kelp and Magnesium Body Wash",
      description: "This eco-conscious body wash has an uplifting, herbal scent (a mix of geranium, rosemary, and sage!), and it's a favorite of Birnur Aral, Ph.D., director of the GH Institute's Health, Beauty, and Environmental Sciences Lab. The bottle is made of 100% recycled plastic — 20% of which is from ocean plastic. Since the pump has no metal spring, it's fully recyclable as-is. ",
      brand: "REN CLEAN SKINCARE",
      vendor: "dermstore.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583782912-72285.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$11.99",
      currentInventory: 12
    },
    {
      id: 5,
      categories: [
        "sustainable",
        "new arrivals"
      ],
      name: "Shea Butter Hand Cream",
      description: "This classic hand lotion won a GH Sustainable Packaging Award. It's made with shea butter to nourish your skin and smooth rough patches. We love that the aluminum tube is fully recyclable, unlike plastic tubes that often end up in landfills. Pro tip: squeeze it from the bottom so you can use every last drop. ",
      brand: "L'OCCITANE",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783017-31co1mQyS4L.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$45.00",
      currentInventory: 12,
      otherInventory: 1
    },
    {
      categories: [
        "sustainable"
      ],
      name: "Rosemary Mint Purifying Shampoo",
      description: "For an invigorating shower experience, cleanse your hair with this rosemary- and mint-scented shampoo. The bottle is made of 100% recycled plastic and it doesn't have any secondary packaging. Plus, our experts note that the recyclable press caps make it easy to dispense the right amount of product so less potentially goes to waste.",
      brand: "AVEDA",
      vendor: "nordstrom.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783233-1581623479-eco-friendly-products-rosemary-mint-purifying-shampoo-1581623456.png?crop=1xw:1xh;center,top&resize=480:*",
      price: "$4.99",
      currentInventory: 12
    },
    {
      id: 7,
      categories: [
        "sustainable",
        "new arrivals"
      ],
      name: "The Right To Shower Joy Shampoo Bar & Bar Soap Tangerine and Honeysuckle Vegan 7 oz",
      description: "Not only does this multi-tasking bar soap clean your entire body, but buying it will give back to the community — the proceeds help create mobile showers for homeless people. It comes in a no-frills box made of recycled paper, and the open window on the front means it uses less materials. Plus, it's made with Rainforest Alliance Certified palm oil, meaning it's harvested in a way that won't destroy forests.",
      brand: "THE RIGHT TO SHOWER",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783342-1581623860-gh-sustainable-products-joy-shampoo-bar-bar-soap-1580419526.png?crop=1xw:1xh;center,top&resize=480:*",
      price: "$34.99",
      currentInventory: 12
    },
    {
      categories: [
        "sustainable"
      ],
      name: "Seventh Generation Dish Soap (6)",
      description: "This rockstar dish soap uses plant-based cleaning ingredients, proving that \"green\" products can actually work well, too! Our experts especially like that the brand chooses to list all the ingredients in its products. Its biodegradable formula contains no fragrances or dyes, and it's also EPA Safer Choice certified. The whole bottle (even the cap!) is made from recycled plastic.",
      brand: "SEVENTH GENERATION",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783454-41-w4oU1shL.jpg?crop=1xw:0.988xh;center,top&resize=480:*",
      price: "$27.99",
      currentInventory: 12
    },
    {
      id: 9,
      categories: [
        "green energy",
        "new arrivals"
      ],
      name: "Purclean Plant-Based Laundry Detergent (2)",
      description: "Purclean laundry detergent is Tide's first plant-based formula, and our home care pros say it cleans very well. What really makes this product stand out is the fact that it's made using renewable electricity (wind power!) at a site where zero manufacturing waste goes to a landfill. It's also a USDA certified bio-based product.",
      brand: "TIDE",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783563-41KuwKCwDHL.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 10,
      categories: [
        "green energy"
      ],
      name: "Little Green Portable Cleaner",
      description: "This hardworking machine can easily tackle dirty armrests, carpet stains, and more using a combination of water, cleaner, and suction. Our cleaning pros love that it's made from recycled plastic, while the box it comes in uses recycled materials. Plus, Bissell eliminated styrofoam from this product's packaging, which helps cut down on waste. It carries both our GH and Green GH Seals!",
      brand: "BISSELL",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583783745-41T4uDA5CL.jpg?crop=1xw:1.00xh;center,top&resize=480:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 11,
      categories: [
        "green energy"
      ],
      name: "Glass Cleaner Bottle with 2 Refill Pods",
      description: "With this refillable glass cleaner, there's no need to purchase an entirely new bottle each time you run out of product. The bottles from JAWS (the name stands for Just Add Water System) are reusable, so all you need to do is fill it with tap water and place a refill pod inside.  The brand also makes refillable cleaning products for the kitchen, shower, granite, and more.",
      brand: "JAWS",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 12,
      categories: [
        "green energy",
        "new arrivals"
      ],
      name: "Pure Baking Soda",
      description: "Baking soda can be used for nearly anything — use it as a mild abrasive for cleaning scuffs and marks, to deodorize stinky fridges and garbage cans, and so much more. Since baking soda (a.k.a. sodium bicarbonate) comes from minerals found in the earth, you don't have to feel as guilty about using it for everything. ",
      brand: "ARM & HAMMER",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 13,
      categories: [
        "green energy"
      ],
      name: "Cleaning Cloths",
      description: "GH Cleaning Lab Director Carolyn Forte says these Swedish dish cloths, which are made of cotton and cellulose,  \"are an alternative to germy sponges that get thrown out after only a few uses and paper towels.\" They can be washed and reused multiple times for things like washing dishes or cleaning spills.",
      brand: "SKOY",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 14,
      categories: [
        "green energy"
      ],
      name: "Botanicals Liquid Fabric Softener (2)",
      description: "Using fabric softener is a great way to prevent clothes from looking worn, so our cleaning experts recommend this one from Gain. The plant-based formula is USDA certified to be 70% biobased, and it doesn't contain any dyes, parabens, or optical brighteners (a.k.a. chemicals that make fabrics appear whiter).",
      brand: "GAIN",
      vendor: "amazon.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 15,
      categories: [
        "green energy"
      ],
      name: "Exhale Stash Pocket Heel Tight",
      description: "Athleta's workout pants regularly impress our Textiles experts with how well they perform in our tests, but the brand is also great from a sustainability aspect: Athleta says that 60% of its products use sustainable materials. This pair is made from recycled polyester sourced from post-consumer plastic bottles. ",
      brand: "ATHLETA",
      vendor: "athleta.gap.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    },
    {
      id: 16,
      categories: [
        "green energy"
      ],
      name: "Women's Wool Runners",
      description: "Allbirds are an GH expert and editor favorite because they're comfortable, lightweight, and machine-washable. Our pros like the brand's sustainable approach to materials: the merino wool is a natural fiber and follows ethical standards, the polyester in the laces is from recycled water bottles, and the packaging is made of 90% recycled cardboard.  ",
      brand: "ALLBIRDS",
      vendor: "allbirds.com",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/eco-friendly-products-green-1583963027.png?crop=1.00xw:0.753xh;0,0.0856xh&resize=980:*",
      price: "$6.56",
      currentInventory: 12
    }
]

inventory.map(i => {
  i.id = uuid()
  return i
})

export default inventory