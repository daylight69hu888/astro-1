// planet-house-guide.js — FULL-DETAIL version, transcribed closely from the user's own
// 9 planet-in-12-houses PDF guides (Mars, Mercury, Venus, Sun, Saturn, Rahu, Ketu,
// Jupiter, Moon). Includes the conditional "if [another planet] is placed in house X"
// clauses exactly as written in the source PDFs (these describe how that specific
// house-result changes, not a general conjunction analysis).
window.CHITRA_PLANET_HOUSE_GUIDE = {

  Sun: {
    1: { theme: 'Personality, Ambition & Physical Vitality', badge: 'Exalted (Aries)', tone: 'good',
      intro: 'The 1st house naturally corresponds to Aries, where the Sun is exalted. Sitting here makes the Sun exceptionally powerful, instilling the mindset and demeanor of a true king.',
      positive: [
        'You carry yourself like royalty — even without money in your pocket, you never back down from your core values, principles, or self-respect, and you stand firm for friends and loved ones even against the whole world.',
        'You unconsciously take charge in any group setting — in a group of four friends, you naturally emerge as the leader, speaking with direct authority about what needs to be done and by when.',
        'Your face carries a distinct solar radiance (Tejas).',
        'Excellent for government positions, administrative services, and preparing for high-authority bureaucratic roles.',
      ],
      negative: [
        'Hair issues are common: men often see an M-shaped receding hairline; women see significant hair shedding/breakage.',
        'Too much personal power makes compromise difficult — in marriage or business partnerships you tend to want things done your way, which creates friction.',
        'Pride stops you from seeking assistance even when struggling — the internal attitude is "I am big, I am powerful, I will handle it," even when help would genuinely serve you better.',
      ] },
    2: { theme: 'Speech, Wealth & Family', tone: 'good',
      intro: 'The 2nd house governs speech, accumulated wealth, and family ties. With the Sun (Atmakaraka, the soul-indicator) placed here, your soul finds supreme satisfaction in generating wealth and steering your family.',
      positive: [
        'Your voice naturally carries authority and command — you speak directly and decisively, without fear or self-doubt.',
        'You feel deep internal pride in saying "I earned this money, I built this wealth, and I provided for my family."',
        'Family is everything to you — you have a giving nature and will sacrifice a great deal to protect and uplift family members, naturally acting as the household\u2019s director/guide.',
      ],
      negative: [
        'You are extremely generous toward family, but you crave praise, recognition, and appreciation in return — when it doesn\u2019t come, the generosity can feel unrewarding.',
      ] },
    3: { theme: 'Effort, Courage, Travel & Siblings', tone: 'good',
      intro: 'The 3rd house represents hard work, courage, short journeys, writing, and siblings. The Sun thrives here because a king\u2019s primary duty is action and directing his subjects.',
      positive: [
        'You are not afraid of hard work or heavy responsibility — instead of complaining, you systematically structure tasks and execute them efficiently.',
        'You find real soul-happiness while traveling and roaming around, and you may enjoy writing, poetry, singing, or digital/online business.',
        'You are deeply attached to your siblings and act as their guiding, protective figure.',
      ],
      negative: [
        'Classical texts describe the Sun here as strict/ruthless (Nirdayi) — before "the king," excuses don\u2019t work, only purposeful action, which can make you impatient with others who make excuses.',
      ] },
    4: { theme: 'Mother, Home, Vehicles & Luxury', tone: 'neutral',
      intro: 'The 4th house governs mother, property, vehicles, and domestic comfort. Sitting in the house of luxury, the Sun seeks royal living standards.',
      positive: [
        'A government office is often located near your home or birthplace; your mother may hold a government post or have close relatives in government roles.',
        'Fond of fine vehicles, driving, and home decor — your interiors often feature yellow, golden, white, or off-white color accents (the Sun\u2019s colors).',
        'Deeply attached to your mother, inheriting her qualities and willing to do a great deal for her happiness.',
      ],
      negative: [
        'You may need to leave your birthplace/homeland and shift to another city or state for growth.',
        'Interestingly, your mother often exhibits strong, Sun-like dominating traits at home, while your father tends to stay more subordinate to her influence.',
      ] },
    5: { theme: 'Education, Children, Mantras & Intellect', badge: 'Natural placement (Leo)', tone: 'good',
      intro: 'The 5th house naturally corresponds to Leo, where the Sun is highly comfortable, bestowing sharp intelligence, high education, and creative prowess.',
      positive: [
        'You are a lifelong learner — even after graduating, you constantly read, learn new skills, and expand your knowledge.',
        'Highly focused on your children\u2019s education, ensuring they attend elite schools; your children tend to inherit your leadership traits and lifestyle preferences.',
        'The 5th house governs Mantras — you develop a deep spiritual connection to a specific mantra, gaining real peace and fulfillment from chanting it.',
      ],
      negative: [] },
    6: { theme: 'Enemies, Service & Problem Solving', badge: 'Strong here', tone: 'good',
      intro: 'The 6th house rules enemies, disease, and debts. Here the Sun acts like a king leading an army into battle, granting victory over adversaries.',
      positive: [
        'Looking back, critics, haters, and opponents who tried to pull you down tend to fade into obscurity over time — the king effortlessly neutralizes enemies.',
        'Like a corporate CEO or a matriarch managing a home, when everyone else fails to solve a complex crisis, you step in and fix it.',
        'A strong desire for selfless service (Seva) at temples, gurudwaras, or community centers.',
      ],
      negative: [
        'Watch for weak eyesight, heart issues (usually appearing later in life), and hair loss.',
        'You tend to dislike taking medicines fully — you may start a prescribed course and quit after a couple of days, preferring to "heal on your own."',
      ] },
    7: { theme: 'Marriage, Business Partnerships & Public', badge: 'Debilitated (Libra)', tone: 'bad',
      intro: 'In the 7th house, the natural house of Libra, the Sun is debilitated. The 7th house demands mutual cooperation and compromise, whereas the Sun\u2019s nature is to command.',
      positive: [
        'You perform exceptionally well working independently, freelancing, running a solo business, or in roles where bosses don\u2019t constantly micromanage you.',
      ],
      negative: [
        'For roughly the first 15 years of marriage, you are forced to listen to and accommodate others (in-laws, spouse) — compromising against your naturally royal nature causes inner dissatisfaction.',
        'Joint business partnerships often fail or suffer due to power struggles.',
        'The Sun craves respect and honor above all — you want your spouse and associates to look up to you, and feeling disrespected causes deep emotional pain.',
      ] },
    8: { theme: 'Transformation, Deep Research & Father\u2019s Challenges', tone: 'bad',
      intro: 'The 8th house governs secrets, deep research, obstacles, and sudden events — tough tests for the Sun.',
      positive: [
        'Grants a strong mind for deep research, secret subjects, and investigative analysis.',
      ],
      negative: [
        'Indicates real challenges for your father — career instability, frequent job searches, heart disease, or weak eyesight.',
        '"As is the king, so are the subjects": with the Sun afflicted here, other planets in the chart can lose some of their optimal strength, unless Mars supports or sits with the Sun to push it forward.',
        'You may struggle to see the thin line between genuine self-respect and unhealthy ego.',
      ] },
    9: { theme: 'Dharma, Fortune, Father & Higher Wisdom', tone: 'good',
      intro: 'The 9th house is Jupiter\u2019s domain (higher knowledge, guru, father, dharma). Here the Sun behaves like a dignified king advised by a wise minister.',
      positive: [
        'Highly knowledgeable, you often start earning at an early age and develop a habit of sharing wisdom and guiding others.',
        'Your father is strict, commanding, and respected, highly focused on your education, and may hold a government position or influential connections that benefit you.',
        'A strong urge to travel to distant places or foreign countries for higher education.',
        'Deep devotion to truth and dharma, often manifesting as a strong connection to Lord Rama.',
      ],
      negative: [] },
    10: { theme: 'Career, Authority & Leadership', badge: 'Directional Strength (Digbala)', tone: 'good',
      intro: 'One of the finest placements in astrology. In the house of career (Saturn\u2019s natural house), the Sun gains Directional Strength.',
      positive: [
        'Even without an official title, colleagues and even senior bosses treat you like the authority, consulting you before major decisions.',
        'You naturally rise to lead a large team or department over time, even starting from a humble position.',
        'Excellent for government jobs, administrative service, and joining higher power circles.',
      ],
      negative: [] },
    11: { theme: 'Gains, Ambitions, Friends & Romance', tone: 'good',
      intro: 'The 11th house rules gains, desires, friends, and social circles. Here the Sun fuels massive ambitions and high self-worth.',
      positive: [
        'A deeply loyal, helpful friend and relative who gives great guidance.',
        'You cannot entertain small goals — your attitude is grand, dreaming of major achievements and a bigger life.',
        'High romantic and sexual drive — when you fall in love, you announce it openly and stand firmly by it.',
      ],
      negative: [
        'If a friend or relative acts deceitfully or backstabs you, you cut them off completely and never look back.',
      ] },
    12: { theme: 'Solitude, Foreign Lands & Financial Investments', tone: 'neutral',
      intro: 'The 12th house represents isolation, foreign lands, and expenses. Because the Sun needs "subjects" to rule, sitting in isolation creates internal paradoxes.',
      positive: [
        'You learn investing (stock markets, mutual funds, bonds) at a very early age, and after learning, you often guide others who come to you for advice.',
      ],
      negative: [
        'You prefer working alone, but that solitude can slowly convert into loneliness without you realizing it — your mind fluctuates between wanting to be left alone and feeling isolated.',
        'Creates an irregular daily routine — sleeping, waking, and work happen at erratic, undisciplined hours.',
      ] },
  },

  Moon: {
    1: { theme: 'Emotional Nature, Lifelong Learning', tone: 'neutral',
      intro: 'When the Moon occupies the 1st house, your arrival into the world involved real struggle and effort by your mother — it was not an easy birth.',
      positive: [
        'Emotional, attractive, charming, and highly moody by nature.',
        'If placed in Saturn\u2019s signs (Capricorn/Aquarius) or Jupiter\u2019s signs (Sagittarius/Pisces), the Moon behaves more stably and causes less distress.',
      ],
      negative: [
        'Your mother\u2019s pregnancy typically involved a poignant story of hardship — excessive work, family pressure, or health complications.',
      ],
      remedy: 'The golden rule here: education is the fuel of your life. As long as you keep studying and learning new things, you rise steadily; the moment you stop, growth reaches a standstill.' },
    2: { theme: 'Wealth, Family, Speech', tone: 'neutral',
      intro: 'The 2nd house governs family, accumulated wealth, and food habits. The Moon here makes you a fun-loving individual who deeply enjoys life with family.',
      positive: [
        'You love the beach, music, or reading — enjoying life in a relaxed atmosphere.',
        'A highly particular, refined taste in food — you frequently try new restaurants and high-quality dishes.',
        'A highly supportive and pleasant family environment; you cherish family moments.',
      ],
      negative: [
        'Not favorable for saving money — wealth flows in and out constantly, and no matter how hard you try, building a large liquid bank balance faces frequent hurdles.',
      ] },
    3: { theme: 'Effort, Courage, Travel & Siblings', tone: 'neutral',
      intro: 'The 3rd house represents short travels, courage, and siblings. The Moon here represents the mother and emotional comfort.',
      positive: [
        'Your mother often steps up to play a father-like role in your life, providing guidance and direction.',
        'You derive real pleasure and mental joy from short trips, traveling, and roaming around.',
      ],
      negative: [
        'Your sibling is likely quite moody or a chronic overthinker.',
        'You cannot perform well under intense pressure or chaotic environments — you need a clean desk and harmony; under high pressure you experience severe anxiety, though in a peaceful setting you deliver stellar work.',
      ] },
    4: { theme: 'Home, Mother & Vehicles', badge: 'Own house (Cancer)', tone: 'good',
      intro: 'The 4th house is the Moon\u2019s natural home. Highly praised in texts like Lal Kitab, this placement grants deep emotional purity and domestic bliss.',
      positive: [
        'Passionate about changing cars, renovating the house, rearranging furniture, or buying decorative pieces to beautify the home.',
        'A deep, unshakeable love for your mother — you go to great lengths to keep the home environment peaceful.',
        'Extremely sweet-spoken, pious, gentle, and loving in demeanor.',
      ],
      negative: [
        'Loud voices, shouting, or aggressive arguments at home deeply disturb your peace.',
      ] },
    5: { theme: 'Intelligence, Promises, Intuition & Astrological Mind', tone: 'good',
      intro: 'The 5th house governs intellect, past-life merits, intuition, and promises. The Moon here bestows remarkable psychological insight.',
      positive: [
        'An outstanding combination for becoming an astrologer or counselor — you can read people\u2019s unspoken feelings and decipher what\u2019s happening inside their hearts without a word being said.',
      ],
      negative: [
        'You frequently make promises to yourself or others ("I\u2019ll start the gym tomorrow") that you consistently fail to fulfill.',
        'You rarely end up using your formal academic degree in your actual professional life.',
      ] },
    6: { theme: 'Enemies, Jobs, Fluctuations & Healing', tone: 'neutral',
      intro: 'The 6th house is the house of obstacles, daily service, disease, and job routine. Because the Moon fluctuates daily, sitting here causes instability in daily work.',
      positive: [
        'People feel immensely relieved and comforted just by talking to you — exceptional for psychologists, healers, counselors, and astrologers.',
      ],
      negative: [
        'An emotional rollercoaster at work — one day you love your job, the next you want to quit; you frequently switch jobs, departments, or desks every 1.5-2 years.',
        '90% of the time your mind remains restless, even when there\u2019s no major problem in life — an inexplicable inner emptiness or anxiety.',
      ],
      remedy: 'Volunteering selflessly (Seva) at a temple, gurudwara, ashram, or satsang instantly calms your restless Moon.' },
    7: { theme: 'Marriage, Business & Financial Growth', tone: 'good',
      intro: 'The 7th house represents marriage, public dealings, and business partnerships. The Moon here connects financial prosperity directly to your spouse.',
      positive: [
        'Excellent for post-marital growth — your career, salary, and business often flourish significantly after marriage; early marriage is often advised to unlock this luck.',
      ],
      negative: [
        'Marriage often has a unique emotional story behind it (a forced marriage, reluctance, or an emotional decision).',
        'High money inflow, but savings slip through your fingers — you constantly wonder where the month\u2019s money went.',
      ] },
    8: { theme: 'Anxiety, Overthinking & Mother\u2019s Health', badge: 'Debilitated (Scorpio)', tone: 'bad',
      intro: 'The 8th house is the natural house of Scorpio, where the Moon is debilitated — one of the most difficult placements for mental peace.',
      positive: [],
      negative: [
        'Severe mental restlessness, quick panic, paranoia, and trust issues — you may sit alone overthinking the future and catastrophizing scenarios, especially if afflicted by Saturn or Rahu.',
        'Indicates a tragic or painful life story for your mother, who is prone to blood pressure issues, lower back pain, and knee trouble.',
      ],
      remedy: 'Prepare sweet rice pudding (Kheer) with your own hands and distribute it to elderly people at an old-age home, once a month on a Sunday or Monday.' },
    9: { theme: 'Gurus, Religion, Luck & Higher Learning', tone: 'neutral',
      intro: 'The 9th house rules higher wisdom, religion, father, and fortune. The Moon\u2019s presence brings frequent shifts in faith and mentorship.',
      positive: [
        'Excellent for pursuing higher studies, research, and academic degrees.',
      ],
      negative: [
        'You switch teachers/spiritual mentors frequently, struggling to find one you trust long-term.',
        'Your devotion and even religious practice can shift often, and your sense of luck fluctuates — "God is on my side" one day, "why does this always happen to me" the next.',
        'In rare, heavily afflicted cases (via Navamsha), this can indicate the mother having more than one husband/father-figure across the native\u2019s life.',
      ] },
    10: { theme: 'Profession, Office Family & Father\u2019s Wealth', tone: 'neutral',
      intro: 'The 10th house governs career, reputation, and public status. Sitting here, the Moon seeks emotional bonding at the workplace.',
      positive: [
        'You treat your workplace like a family, forming close emotional friendships with colleagues.',
      ],
      negative: [
        'Because the Moon changes signs every ~2 days, you can struggle to stay in one job long-term.',
        'Often accompanied by a story of your father having significant wealth at some point but losing it through a wrong decision or a market/lottery loss.',
      ] },
    11: { theme: 'Shifting Desires, Mother Friction & Stress', badge: 'Generally afflicted here', tone: 'bad',
      intro: 'The 11th house rules gains and desires. The Moon is generally considered afflicted here, causing emotional dissatisfaction and mental tension.',
      positive: [],
      negative: [
        'Negatively impacts your mother\u2019s health, and you may have lacked the maternal affection you deserved in childhood, leading to frequent arguments with her.',
        'Your desires change constantly — deeply certain about something in January, completely reversed by June.',
        'Highly prone to overthinking, chronic stress, anxiety, and mental fatigue.',
      ] },
    12: { theme: 'Solitude, Sleep, Blind Public Trust & Expenses', tone: 'neutral',
      intro: 'The 12th house represents isolation, expenses, foreign lands, and sleep. The Moon here creates a distinct aura of public honesty.',
      positive: [
        'The outside world trusts you blindly because your voice sounds completely honest and sincere, even when family members know your private quirks.',
      ],
      negative: [
        'Causes irregular sleep — either sleeping excessively, insomnia, or staying up late.',
        'You initially seek isolation ("leave me alone"), but after a few days it turns into loneliness ("nobody calls or texts me").',
      ] },
  },

  Mars: {
    1: { theme: 'Personality, Ambition & Physical Vitality', badge: 'Manglik House', tone: 'good',
      intro: 'Mars in the 1st house directs the individual\u2019s maximum mental and physical drive toward personality, ambition, and physical vitality.',
      positive: [
        'Highly ambitious and naturally attracted toward authority, leadership, and power — politics, administration, or business.',
        'Strong physical stamina, an athletic build, and a broad chest; often carries a mark or scar on the face/head from childhood; extremely honest and truthful in speech.',
        'Major financial and career advancement typically occurs after age 28 — government jobs or Saturn-related industries (machinery, oil, steel, construction) bring great success.',
      ],
      negative: [
        'High temper and impatience.',
        'Sitting idle creates intense self-doubt and frustration.',
      ],
      remedy: 'Stay physically active through the gym, athletics, or sports — sweating daily is the best remedy.' },
    2: { theme: 'Wealth Creation, Family & Speech', badge: 'Wealth Focus', tone: 'good',
      intro: 'Mars in the 2nd house channels energy toward wealth creation, family, and speech.',
      positive: [
        'Views money as a primary source of security and power, spending energy building multiple income streams and family assets.',
      ],
      negative: [
        'Voice tone can sound commanding or dictatorial, unintentionally coming across as blunt to others.',
        'Money disputes or joint-business conflicts with extended family/relatives can drain your energy.',
      ],
      remedy: 'Avoid heated family arguments. Keep a brass deer figurine in the North-West of your home; immerse 100g of sweet water/sweets in running water for 43 consecutive days.' },
    3: { theme: 'Courage, Hard Work & Siblings', badge: 'Warrior Spirit', tone: 'good',
      intro: 'Mars acts like a warrior in the 3rd house — extremely hard-working, passionate, and restless, unable to sit idle for long.',
      positive: [
        'A natural, high work ethic — passionate and unable to stay still.',
      ],
      negative: [
        'Hyperactive in childhood, tending to break household items due to unchanneled energy; occasional conflicts with seniors at work.',
        'Some distance with younger siblings may occur, though mutual support tends to remain during real crises.',
      ],
      remedy: 'Wear a solid silver bracelet (Kada) on the left hand; channel energy into sports, running, or high-intensity workouts.' },
    4: { theme: 'Domestic Peace, Mother & Property', badge: 'Manglik House', tone: 'bad',
      intro: 'In the 4th house, energy goes into family, vehicles, and home — but since the 4th house weakens Mars, it can cause domestic disharmony.',
      positive: [],
      negative: [
        'Tendency toward sudden anger outbursts and a tendency to break household objects when angry.',
        'Mother\u2019s health (blood pressure) may be impacted; acidity or digestive issues are possible for the native.',
      ],
      remedy: 'Practice strict anger management. Offer sweet milk to the roots of a Banyan tree on Tuesdays and apply the moist soil to your navel.' },
    5: { theme: 'Intelligence, Children & Crisis Resolution', badge: 'Sharp & Courageous', tone: 'good',
      intro: 'Mars in the 5th house is highly skilled in sports, takes education seriously, and has an innate talent to calmly resolve major disputes or crises without fear.',
      positive: [
        'Children achieve great success and bring pride to the family.',
        'High passion levels — energy flows into romance and creative pursuits.',
      ],
      negative: [
        'Women should take extra care during pregnancy (risk of miscarriage or C-section delivery).',
      ],
      remedy: 'Plant and regularly water a Neem tree. At night, keep a vessel of water near your bed and pour it into a thorny plant the next morning.' },
    6: { theme: 'Enemy Destruction, Problem Solving & Health', badge: 'Shatru Hanta Yoga', tone: 'good',
      intro: 'An exceptionally powerful placement — Mars here completely neutralizes enemies and competitors and makes for a brilliant problem-solver under pressure.',
      positive: [
        'Debts clear easily; property should be bought via bank loan rather than full cash to avoid legal traps.',
      ],
      negative: [
        'Watch for blood pressure fluctuations, skin rashes, eye strain, or spine issues.',
      ],
      remedy: 'Keep a red LED light turned on 24/7 in the South of your house; worship Lord Ganesha regularly; avoid consuming or donating excessive sweets.' },
    7: { theme: 'Business Expansion, Desires & Marriage', badge: 'Manglik House', tone: 'neutral',
      intro: 'Mars here is excellent for business expansion and commercial partnerships, with material desires manifesting over time.',
      positive: [
        'Strong for business expansion and manifesting material desires over time.',
      ],
      negative: [
        'Frequent minor arguments with spouse.',
        'Spouse\u2019s health (migraines, leg pain, or blood-related sensitivity) requires care.',
      ],
      remedy: 'Prepare sweet semolina halwa (Suji Halwa) on Tuesdays or Thursdays, offer it to Lord Vishnu, and distribute it to young girls or widows. Avoid keeping unused musical instruments or drying creepers at home.' },
    8: { theme: 'Privacy, Secret Knowledge & Determination', badge: 'Manglik House', tone: 'neutral',
      intro: 'Mars here gives a reserved, secretive personality that loves privacy — extremely determined, bold, and strict about honoring commitments, with an unforgiving memory.',
      positive: [
        'Extremely determined, bold, and strictly honors commitments.',
      ],
      negative: [
        'Care is needed regarding spouse\u2019s health and in-law relationships.',
        'Attention needed to digestive and lower-body health.',
      ],
      remedy: 'Eat at least one meal a day sitting inside the kitchen. Feed dry tandoori rotis with jaggery (Gur) to street dogs for 43 consecutive days.' },
    9: { theme: 'Fortune, Higher Learning & Father', badge: 'Fortunate Position', tone: 'good',
      intro: 'Energy here goes toward religious activities, higher education, trading, and honoring mentors — a humble and righteous nature.',
      positive: [
        'Highly auspicious for administrative jobs, government positions, trading, and higher learning.',
        'Good fortune tends to unlock rapidly after age 28, with strong support from joint family.',
      ],
      negative: [],
      remedy: 'Maintain faith in spiritual values and show utmost respect to your father, mentors, and teachers.' },
    10: { theme: 'Career, Status & Kuldeepak Yoga', badge: 'Exalted Position', tone: 'good',
      intro: 'One of the absolute best placements for Mars — grants immense career drive, high executive status, and societal honor (Kuldeepak Yoga).',
      positive: [
        'Transforms the financial status of the family; the native tends to possess vast real estate assets and creates job opportunities for others.',
      ],
      negative: [],
      remedy: 'Never sell ancestral real estate property or gold. Place a brass deer figurine in the West or North-West direction.' },
    11: { theme: 'Gains, Networking & Strategic Intelligence', badge: 'Steady Gains', tone: 'good',
      intro: 'Excellent for entrepreneurs and business leaders — cash flow rarely dries up completely, and the native is highly intelligent at identifying legal or technical loopholes to resolve complex disputes.',
      positive: [
        'Strong, continuous income potential for entrepreneurs and business leaders.',
      ],
      negative: [
        'Spends a lot of energy on friends, but blind financial trust in friends can lead to betrayal.',
      ],
      remedy: 'Avoid blind financial partnerships with friends. Fill a small earthen pot with honey and vermilion (Sindoor) and bury it in a quiet, isolated spot.' },
    12: { theme: 'Foreign Lands, Expenses & Medical Care', badge: 'Manglik House', tone: 'neutral',
      intro: 'Excellent for foreign settlement, acquiring overseas property, or working with multinational corporations.',
      positive: [
        'Strong for foreign settlement and overseas career opportunities.',
      ],
      negative: [
        'Often resides near a hospital or faces recurring family medical expenses; needs focus on digestive health.',
      ],
      remedy: 'Drink lukewarm water mixed with honey every morning on an empty stomach. Distribute sweets during auspicious family celebrations.' },
  },

  Mercury: {
    1: { theme: 'Intellect, Personality, Speech, Self-Expression', tone: 'good',
      intro: 'Mercury in the 1st house makes the person naturally intelligent, highly communicative, witty, and charming with a broad, expressive smile.',
      positive: [
        'Extremely fast brain, quick adaptability, and sharp learning skills.',
        'Charming personality that easily makes friends in new social circles.',
        'Strong drive for self-effort, side businesses, and career visibility, along with a great gift of speech.',
      ],
      negative: [
        'Tendency to overshare personal details, which can reduce long-term respect from others.',
        'Overthinking, restlessness, and constant internal questioning.',
        'Potential conflicts or distance with siblings, or with their married life; risk of addiction or escapism if paired with Moon.',
      ],
      remedy: 'Worship Lord Ganesha on Wednesdays, recite Ganpati Atharvashirsha, or feed flour dough balls to fish.' },
    2: { theme: 'Wealth, Family Speech, Financial Acumen', tone: 'good',
      intro: 'Mercury in the 2nd house directs intellect toward financial growth, asset creation, and impactful verbal communication.',
      positive: [
        'Strong financial acumen and the ability to build multiple sources of income; an excellent opportunist who can find business ideas even during crises.',
        'Great oratorical skills, often learned or inherited from family; success in finance, gems, jewelry, trading, and commission-based businesses.',
      ],
      negative: [
        'A restless, fast-moving thought process that changes rapidly.',
        'Possible hidden family secrets or regrets around past financial decisions; possibility of dental issues.',
        'Health issues among in-laws, or minor friction with family members.',
      ] },
    3: { theme: 'Smart Work, Marketing, Courage, Passions', badge: 'Mercury\u2019s own sign (Gemini)', tone: 'good',
      intro: 'This is Mercury\u2019s natural house, bringing exceptional marketing instincts, smart working capability, and creative passions.',
      positive: [
        'Natural talent for digital business, franchises, sales, and marketing; passionate about music, playing instruments, writing, or acting.',
        'A smart worker who uses brainpower rather than pure physical labor, capable of generating immense wealth if the 9th and 11th houses are favorably placed.',
      ],
      negative: [
        'High energy can be wasted on sibling disputes or joint-business risk; friends may inadvertently cause increased hard work or confusion.',
        'An unusual walking posture or vulnerability to lower back pain.',
      ] },
    4: { theme: 'Home, Mother, Property, Emotional Mind', badge: 'Rajyoga if unafflicted', tone: 'good',
      intro: 'In the house of the Moon, Mercury focuses intellect on property, home environment, and mental imagination — a Rajyoga planet if unafflicted.',
      positive: [
        'Steady inflow of money and wealth from unexpected sources (Rajyoga); highly intelligent, business-minded mother.',
        'Possesses unique skills that make the person indispensable at work; strong interest in real estate, vehicles, and creative home design.',
      ],
      negative: [
        'Prone to day-dreaming, self-doubt, overthinking, and superstitious doubts; preference for comfort over hard manual labor.',
        'Ego clashes with bosses or authority figures due to a tricky attitude.',
      ] },
    5: { theme: 'Wisdom, Memory, Languages, Authority Speech', badge: 'Vak Siddhi', tone: 'good',
      intro: 'A powerful placement in the Sun\u2019s natural house — grants authoritative speech, impressive memory, multi-subject learning, and Vak Siddhi (spoken words tending to come true).',
      positive: [
        'Sharp memory, quick grasp over languages, and multi-disciplinary knowledge; spoken predictions or intuitive remarks often come true.',
        'A youthful appearance, glowing skin, healthy metabolism, and a joyful childhood with great academic success.',
      ],
      negative: [
        'Sharp, harsh speech during anger that can deeply hurt others; a stubborn "bend or break" attitude.',
        'Tendency to work hard for others while others enjoy the primary fruits.',
      ],
      remedy: 'Worship Lord Ram or observe fasts on Wednesdays for financial prosperity.' },
    6: { theme: 'Exaltation, Problem Solving, Analytics, Accounting', badge: 'Exalted (Virgo)', tone: 'good',
      intro: 'This is Mercury\u2019s own house and sign of exaltation, creating a master problem-solver with unmatched analytical skill and detail-orientation.',
      positive: [
        'Exceptional problem-solving abilities and a sharp analytical mind; meticulous record-keeping, accounting skills, and financial management.',
        'Success in trading, speculation, agriculture-related land, or intellectual roles; often a free-spirited career path that sets a new precedent in the family.',
      ],
      negative: [
        'Tendency to over-analyze, nitpick, and get drawn into minor arguments — wasted energy on petty squabbles rather than big-picture goals.',
      ] },
    7: { theme: 'Marriage, Spouse, Business Partnerships, Midas Touch', tone: 'good',
      intro: 'Placed in Venus\u2019s house, Mercury brings a youthful, communicative spouse, playful marriage dynamics, and a "Midas touch" in business advice.',
      positive: [
        'Attracts a youthful-looking, highly intelligent, and talkative spouse; giving advice or touching a business project brings success ("Midas touch").',
        'A playful, sibling-like bond with the partner; forms powerful "Bhadra Yoga" benefits when well-placed.',
      ],
      negative: [
        'Deep karmic debts in relationships — one partner may end up giving much more than the other.',
        'Multiple romantic interests or calculations before finalizing marriage; daily petty squabbles over small domestic issues.',
      ] },
    8: { theme: 'Crisis Management, Research, Commission, Health', tone: 'neutral',
      intro: 'In the 8th house, Mercury acts as a disaster manager during crises, though it requires conscious effort to maintain emotional stability and steady earnings.',
      positive: [
        'An excellent crisis manager — intellect shines when others panic; profitable in commission-based work, recycling, manufacturing, and medical fields.',
        'Sudden financial gains, inheritance benefits, or post-crisis success are possible.',
      ],
      negative: [
        'Job instability or financial struggles if driven by negative emotions.',
        'Health vulnerabilities: throat, thyroid, dental cavities, nerve issues, back pain; a potentially discouraging family environment or critical relatives.',
      ],
      remedy: 'Serve red cows, donate to Gaushalas, or engage in charitable service.' },
    9: { theme: 'Intellect vs Luck, Philosophy, Independent Beliefs', tone: 'neutral',
      intro: 'Placed in Jupiter\u2019s house, Mercury creates high talent and intellect, but luck may lag behind effort — the person questions traditional beliefs and seeks logic.',
      positive: [
        'Highly skilled, capable, and a responsible pillar of the family; an independent, logical, and practical approach to religion and philosophy.',
        'Enjoys teaching or sharing practical life lessons with others.',
      ],
      negative: [
        'A feeling that less-talented people get luckier or move ahead faster; struggle to get full material returns despite high capability.',
        'Potential ideological friction or career challenges for the father.',
      ],
      remedy: 'Lal Kitab advice: never sell or mortgage ancestral property or family gold.' },
    10: { theme: 'Status, Workaholism, Sales, Business Strategy', tone: 'good',
      intro: 'In Saturn\u2019s natural house, Mercury creates an ambitious trader and business strategist who works relentlessly to elevate personal and professional status.',
      positive: [
        'Exceptional sales, marketing, persuasion, and trading skills; high patience and strategic thinking in business dealings.',
        'A go-to problem solver for colleagues, friends, and family; a strong drive to elevate social status, buy good cars, and own property.',
      ],
      negative: [
        'Extreme workaholism, leading to self-created mental pressure ("Gulam Halat"); neglect of family time and personal leisure.',
      ] },
    11: { theme: 'Financial Gains, Legal Skills, Speech for Profit', badge: 'Maturity rises after 34', tone: 'good',
      intro: 'Mercury here focuses intensely on income gains, trading profits, and professional communication, though social circles tend to shrink over time.',
      positive: [
        'Continuous focus and ideas for generating financial gains and profits; an excellent profile for legal careers, advocacy, and commercial negotiation.',
        'Significant rise in life maturity and career decisions after age 34.',
      ],
      negative: [
        'Early career/college missteps before age 34, leading to wasted time; a shrinking friend circle and feelings of loneliness or ego-driven isolation.',
        'Late-night sleeping habits and an overactive nocturnal brain.',
      ],
      remedy: 'Offer red flowers to a Goddess deity on Saturdays, observe Saturday fasts, and proactively reach out to friends.' },
    12: { theme: 'Debilitation, Selfless Service, Nature Connection', badge: 'Debilitated (Pisces)', tone: 'bad',
      intro: 'Mercury is debilitated in the 12th house. The person works hard for others, often sacrificing personal rest, and requires grounding in nature and calm.',
      positive: [
        'Destined to earn and selflessly support family, spouse, and dependents; strong intuition and deep peace when living near nature, hills, or water.',
        'Debilitation effects can be neutralized if paired with Venus (Neecha Bhanga).',
      ],
      negative: [
        'Others often enjoy the fruits of their hard work and earnings.',
        'Vulnerability to respiratory/lung issues, skin scars, or dental problems; extreme mood swings, severe overthinking, and an unforgiving nature if crossed.',
        'Neglect of personal physical appearance or self-care.',
      ],
      remedy: 'Place a green-themed Radha Krishna picture or Green Jade/Aventurine crystals in the South-East zone of your home. Avoid smoking and air pollution.' },
  },

  Venus: {
    1: { theme: 'Spouse & Personality', badge: 'Dhan Yoga', tone: 'good',
      intro: 'The 1st house is naturally considered Mars\u2019s territory and the Sun\u2019s abode in Lal Kitab. Because Venus represents the spouse, having Venus here makes the partner possessive and eager to lead marital decisions.',
      positive: [
        'Creates a strong financial yoga (Dhan Yoga), granting excellent earning opportunities and material prosperity.',
        'A romantic, passionate nature with a love of premium, high-end items; highly charming with attractive, prominent eyes and higher-than-average baseline body heat.',
      ],
      negative: [
        'The spouse tends to be possessive, controlling, and eager to dominate marital decisions; the couple keeps their married life strictly private behind closed doors.',
        'Prone to chronic issues from overindulgence (alcohol, smoking, substances), impacting lungs, liver, or kidneys.',
        'Differences of opinion with the father despite underlying affection; attracts unprovoked jealousy from people who assume the native is wealthy.',
      ],
      remedy: 'Strictly avoid all forms of addiction and substance overindulgence to protect kidney, liver, and lung health.' },
    2: { theme: 'Family & Refinement', tone: 'good',
      intro: 'Venus in the 2nd house of family and speech enforces high standards — demanding top-class, brand-new, first-hand items for the household, and rejecting second-hand goods or renovated living spaces.',
      positive: [
        'Often born into a family with established financial resources and good material support.',
        '(Lal Kitab) The native rarely needs to beg or plead for financial assistance — resources and sustenance tend to arrive naturally and on time.',
        'Children are exceptionally gifted and talented from an early age, bringing honor and fame to the family.',
      ],
      negative: [] },
    3: { theme: 'Courage & Dynamics', tone: 'neutral',
      intro: 'In the 3rd house, the partner stands shoulder-to-shoulder through all ups and downs, offering long-term support during tough times.',
      positive: [
        'A steadfast, supportive spouse through life\u2019s ups and downs.',
      ],
      negative: [
        'Financial prosperity typically requires moving away from the birthplace for career opportunities.',
        'Speculative shortcuts, stock tips, futures/options, or risky property deals cause severe financial losses.',
        'A strong personal aura attracts casual relationship opportunities — yielding to illicit relationships is said to dull the facial glow and degrade life energy; females may face PCOD/PCOS, males reproductive weaknesses.',
        'Post-birth financial loss or debt for the father is possible.',
      ],
      remedy: 'Avoid speculative financial shortcuts and casual affairs.',
      conditional: [
        { text: 'If Venus is in the 3rd house and Jupiter is in the 9th house, long illnesses can occur — Venus remedies are highly recommended in this specific combination.' },
      ] },
    4: { theme: 'Home & Mind', tone: 'neutral',
      intro: 'In the 4th house, following the spouse\u2019s advice yields excellent results and career progress, though there is a tendency toward secret envy of close friends or cousins who achieve success.',
      positive: [
        'Following the spouse\u2019s guidance and advice tends to yield excellent results and career progress.',
      ],
      negative: [
        'Marrying before age 25 creates severe marital conflicts — though Parashari astrology gives Venus Directional Strength here, Lal Kitab considers early marriage harmful in this house.',
        'Relatives or friends may deceive or entrap the native through lies.',
        'Adverse for the mother\u2019s health (nerve pain, spinal issues, or vision problems); health fluctuations for either the native or spouse after marriage.',
      ],
      remedy: 'Strictly abstain from non-vegetarian food and alcohol — indulging in them is said to damage the mother\u2019s health and ruin domestic wealth.' },
    5: { theme: 'Intellect & Romance', tone: 'neutral',
      intro: 'Venus in the 5th house brings frequent romantic/sensual thoughts and multiple romantic relationships, with a tendency to lose interest within a year.',
      positive: [
        'Exceptional mental sharpness, quick learning ability, and refined knowledge.',
        'High potential for love marriage — though parental blessing is described as mandatory; true wealth and prosperity often manifest after marriage, especially after the birth of a daughter.',
      ],
      negative: [
        'Classical texts explicitly warn that extra-marital affairs lead to downfall, loss of aura, and financial ruin — Venus is said to never forgive betrayal.',
        'Marrying against parents\u2019 genuine wishes, or forcing their consent, is said to cause marital failure.',
      ],
      remedy: 'Never engage in extra-marital affairs. Ensure full parental blessings before finalizing a love marriage.' },
    6: { theme: 'Debilitation & Struggles', badge: 'Debilitated', tone: 'bad',
      intro: 'The 6th house is naturally Venus\u2019s debilitation area — heavy financial drainage on medical expenses, legal/court matters, interest, and loan EMIs ("Roga, Ripu, Rina").',
      positive: [
        'Enduring these struggles makes the native deeply knowledgeable in legal affairs, medical treatments, or financial/interest calculations, out of necessity.',
        'Severe initial life struggles tend to build immense inner strength and a powerful personality.',
      ],
      negative: [
        'Cash kept in pockets/wallets frequently vanishes or reduces without clear accounting.',
      ],
      remedy: 'Master remedy: keep your spouse well-dressed, stylish, and happy — the happier and more elegant the spouse, the greater the financial abundance Venus grants. Do not accept clothes as gifts from others, and avoid corrupt shortcuts (bribes), as they multiply financial losses.' },
    7: { theme: 'Marriage & Business', badge: 'Love Marriage Yoga', tone: 'good',
      intro: 'An excellent combination for love marriage, with excellent financial success through Venus- or Mercury-related businesses and a romantic, supportive partner.',
      positive: [
        'Excellent for love marriage and for financial success through Venus/Mercury-related businesses; the partner tends to be romantic and supportive.',
        'Highly unique, non-mainstream taste in art, cinema, and media.',
      ],
      negative: [
        'If Venus is also placed in the 1st or 7th house of the Navamsha (D9) chart without protective aspects, marital discord, extra-marital affairs, or divorce may occur.',
      ],
      conditional: [
        { text: 'Jupiter\u2019s aspect on Venus or on the 7th house, or Venus placed in Sagittarius/Pisces, is said to completely prevent infidelity and protect the marriage.' },
      ] },
    8: { theme: 'Occult & Transformations', tone: 'neutral',
      intro: 'As Daityaguru (teacher of the Asuras), Venus in the 8th house gives deep mastery over astrology, tantra, and worship of fierce deities, alongside some unhealthy mental urges and habitual lying.',
      positive: [
        'Deep mastery over astrology, Tantra, and occult subjects is possible — many highly skilled astrologers carry this placement.',
      ],
      negative: [
        'Unhealthy mental urges and early exposure to adult content are noted; females may face PCOD/PCOS, and past reproductive health issues can delay childbirth.',
        'A tendency toward habitual, casual lying, struggling with direct truthfulness.',
        'A strange cosmic balance: when health is poor, wealth tends to flow; when financial inflow drops, health tends to stay fine. The spouse can be cold, demotivating, or blunt.',
      ] },
    9: { theme: 'Dharma & Transformation', tone: 'neutral',
      intro: 'The father tends to be pious, religious, and affectionate — though the native\u2019s birth may coincide with the father\u2019s business downfall/restart or loss of gold assets.',
      positive: [
        'A loving, pious father; a complete shift in mindset and lifestyle after marriage (e.g., from quiet to talkative, or lazy to hard-working).',
      ],
      negative: [
        'Opportunities for affairs exist, but cheating will severely ruin an otherwise harmonious marriage.',
      ],
      remedy: 'Maintain religious traditions, honor family customs, and serve cows regularly (Gau Seva) to ensure a luxurious and blessed life.' },
    10: { theme: 'Career & Reputation', tone: 'good',
      intro: 'Romantic interest or proposals within the professional environment are common; respecting and following the spouse\u2019s advice enhances social status, prestige, and brings timely promotions.',
      positive: [
        'Respecting and following the spouse\u2019s advice enhances social status, prestige, and timely promotions; the native tends to become reliance-dependent on the spouse for daily operations or finances.',
      ],
      negative: [
        'A tendency to help others only if a personal monetary cut or profit is involved.',
      ],
      remedy: 'Cultivate selfless service without calculating personal profit in every helpful deed — pure intentions unlock lasting career success.' },
    11: { theme: 'Gains & Generosity', tone: 'good',
      intro: 'At least one close friend becomes wealthy, famous, or highly successful; the native is sharp, clever, and shrewd on the inside, while appearing innocent, sweet, and charming on the outside.',
      positive: [
        'At least one close friend becomes notably wealthy or successful; excellent at motivating and restoring positive energy to distressed people, maximizing results with minimal resources.',
      ],
      negative: [
        'A dual personality — sharp/shrewd inside, innocent/charming outside; a tendency to cancel major plans spontaneously at the last minute.',
        'Finances are best managed by the spouse for maximum retention and growth.',
      ],
      remedy: 'Engage in open-hearted charity and donations — the more generously you give to the needy, the more abundance the universe returns.' },
    12: { theme: 'Exaltation, Solitude & Manifestation', badge: 'Exalted', tone: 'good',
      intro: 'Venus is naturally exalted and happy in the 12th house — born to enjoy luxury, comfort, holidays, and foreign travel provided by family/parents.',
      positive: [
        'Strong power of mental manifestation — strong desires eventually materialize in reality; a prominent, well-praised nose is a noted physical trait.',
        'Prefers cozy solitude at home to protect personal energy from crowded social environments.',
      ],
      negative: [
        'Despite overall luxury, the primary source of suffering is the spouse — either due to weak spouse health or constant marital friction.',
        'Difficulties with domestic staff/subordinates; children may marry against the native\u2019s wishes or face marital problems.',
      ],
      remedy: 'Involve and respect your spouse in all major decisions to mitigate domestic friction and maintain peace.' },
  },

  Saturn: {
    1: { theme: 'Ascendant / Tanu Bhava', tone: 'bad',
      intro: 'When Saturn occupies the 1st house, it directly shapes the native\u2019s self-concept, physical traits, and general life rhythm.',
      positive: [],
      negative: [
        'Tasks move slowly and face delays — whether small or large, they typically require two to three attempts to complete.',
        'Chronic dissatisfaction with one\u2019s own work, constantly feeling one could do better; anxiety centers around personal health and career.',
        'Often bestows curly hair, an uneven body structure, and a tendency to develop a prominent stomach over time, with digestive issues common.',
        'Domestic celebrations or auspicious events tend to trigger family arguments before being resolved; the first year of marriage is notoriously challenging.',
      ] },
    2: { theme: 'Dhana & Kutumba Bhava', tone: 'neutral',
      intro: 'The 2nd house governs accumulated wealth, family environment, speech, and dental health.',
      positive: [
        'Builds extreme wealth and financial stability over time — slow, gradual, and steady, but ultimately immense.',
      ],
      negative: [
        'Money arrives in good volume, but saving it is difficult; expenses vanish mysteriously without clear tracking.',
        'Speech can sound sharp or blunt, even when no harm is intended, and is frequently misunderstood.',
        'Prone to dental issues, gum problems, or crooked teeth; may carry a distinct facial mark such as a mole, wart, or scar.',
        'Others frequently feel envious of the native without rational reason; family disharmony and domestic friction are also indicated.',
      ] },
    3: { theme: 'Sahaja & Parakrama Bhava', badge: 'Saturn is comfortable here', tone: 'good',
      intro: 'The 3rd house rules courage, hard work, short journeys, siblings, and neighbors — Saturn feels highly comfortable here.',
      positive: [
        'The native is exceptionally industrious, earns well, and consistently prevails over enemies and competitors.',
        'Rarely carries physical cash, preferring credit cards, online transfers, or digital payments.',
      ],
      negative: [
        'Siblings may face a hard, struggling life; neighborhood interactions or surroundings can be complex or challenging.',
        'Travel frequently involves minor mishaps, physical injuries, stomach upsets, or sudden health discomfort.',
      ] },
    4: { theme: 'Sukha & Matru Bhava', tone: 'bad',
      intro: 'The 4th house represents home environment, domestic happiness, mother, and mental tranquility.',
      positive: [],
      negative: [
        'The family atmosphere is often quiet or tense rather than joyful.',
        'The mother may suffer from joint pain, knee troubles, or leg ailments.',
        'Because Saturn casts its 7th aspect onto the 10th house of career, professional advancement and job promotions experience significant delays and hurdles.',
      ] },
    5: { theme: 'Putra & Purva Punya Bhava', tone: 'bad',
      intro: 'The 5th house governs romance, intellect, education, children, and mental peace.',
      positive: [],
      negative: [
        'Romantic relationships develop slowly, face obstacles, or break up prior to marriage.',
        'Delays in conceiving children, often requiring medical intervention (such as IVF) accompanied by emotional stress and ongoing worry regarding children\u2019s wellbeing.',
        'Inclines the native toward vintage items, historical documentaries, retro music, and antiques.',
        'Potential academic setbacks, school changes, or exam difficulties around ages 16-18.',
      ] },
    6: { theme: 'Ari & Shatru Bhava', tone: 'good',
      intro: 'The 6th house rules employment, disease, opposition, and maternal relatives.',
      positive: [
        'Job or departmental changes occur regularly (roughly every 2.5 to 3 years), and enemies cannot win against the native as long as the native remains truthful — Saturn demands strict justice.',
        'During Saturn\u2019s 19-year Mahadasha, the native becomes immensely industrious, often surprising those around them.',
      ],
      negative: [
        'Fluctuating stomach issues and chronic lower back pain are common.',
        'Friction or rumor-mongering from maternal uncles or opponents.',
      ] },
    7: { theme: 'Yuvati & Kalatra Bhava', tone: 'neutral',
      intro: 'The 7th house governs marriage, spouse, and public business partnerships.',
      positive: [
        'While challenging for marriage, Saturn here grants immense wealth, high profits, and long-term success through business ventures and investments.',
      ],
      negative: [
        'Capable of causing marital separation or divorce; even without divorce, persistent disagreements and fights can plague the relationship.',
        'The spouse may be older, look older than their age, or be extremely hardworking, and may frequently face health or stomach issues.',
      ] },
    8: { theme: 'Randhra & Ayur Bhava', tone: 'neutral',
      intro: 'The 8th house rules longevity, chronic health, sudden losses, and occult sciences.',
      positive: [
        'An excellent placement for studying astrology and occult sciences, as Saturn bestows the deep patience these disciplines require.',
        'Grants long life (often crossing age 80), albeit accompanied by a manageable chronic condition.',
      ],
      negative: [
        'Highly dangerous if the native indulges in alcohol, smoking, or substance abuse — liver or lung health deteriorates much faster than for others.',
        'Prone to accidents during Saturn periods; few or no close friends, difficulty fulfilling self-promises, and struggles regarding inheritance.',
        'Women with this placement frequently feel unloved or unappreciated by in-laws and husband, sensing a lack of romance and emotional warmth.',
      ] },
    9: { theme: 'Dharma & Bhagya Bhava', tone: 'bad',
      intro: '"The Lord of Karma sitting in the House of Fortune" — progress here comes purely through disciplined effort rather than passive luck.',
      positive: [
        'The native is deeply respectful of family traditions, god-fearing, and adheres closely to religious customs.',
      ],
      negative: [
        'The native\u2019s father faces career struggles, health issues, or personal hardships.',
      ] },
    10: { theme: 'Karma Bhava', tone: 'good',
      intro: 'The 10th house rules career stability, authority, profession, and public status.',
      positive: [
        'True, stable professional career begins after age 27 (minor earnings occur earlier, but the main career foundation sets post-27).',
        'Changing jobs or relocating during Saturn periods or Sade Sati often brings substantial profit.',
      ],
      negative: [
        'Constant worry regarding job promotions, job changes, or career comparisons.',
        'Constructing or buying a house often triggers family health issues or unexpected construction delays; the native feels restless when sitting idle.',
      ] },
    11: { theme: 'Labha Bhava', badge: 'Auspicious for earnings', tone: 'good',
      intro: 'The 11th house governs monetary gains, social networks, and fulfillment of desires — an extremely auspicious placement for earnings.',
      positive: [
        'The native earns well and enables others in their network to prosper as well, generating wealth through multiple sources of income.',
      ],
      negative: [
        'Maintains a compact social circle (friends often connect for casual get-togethers); relations with relatives remain formal, limited to holiday greetings.',
        'Indicates love affairs and a tendency to reside in South-facing homes.',
      ] },
    12: { theme: 'Vyaya & Moksha Bhava', tone: 'neutral',
      intro: 'The 12th house represents foreign lands, investments, expenses, and solitude.',
      positive: [
        'Builds multiple real estate properties and receives substantial wealth from foreign sources; excellent at disciplined, long-term (10 to 20-year) portfolio investments started early in life.',
        'The native naturally evaluates potential financial losses or negative risks before analyzing opportunities.',
      ],
      negative: [
        'Initial hurdles in moving abroad (visa delays, flight disruptions, or sudden illness) — though once settled, Saturn holds the native there and makes an easy return difficult.',
        'Experiences 1-2 major financial investment losses over a lifetime; minor bedroom disagreements with spouse before sleep.',
      ] },
  },

  Rahu: {
    1: { theme: 'Ascendant / Tanu Bhava', tone: 'bad',
      intro: 'When Rahu resides in the 1st house, its primary effect is that it afflicts the Sun regardless of where the Sun is placed in the birth chart, since the Sun is Rahu\u2019s arch-enemy. The specific result depends heavily on which house the Sun occupies.',
      positive: [],
      negative: [],
      sunPosition: {
        1: 'Sun in 1st House: causes difficulties in obtaining employment, career obstacles, and delays in promotions.',
        2: 'Sun in 2nd House: leads to humiliation from or toward in-laws, financial instability, and depletion of monetary savings.',
        3: 'Sun in 3rd House: strains relations with brothers, property/business disputes with siblings, lack of sibling happiness, physical distance, or chronic illness of brothers.',
        4: 'Sun in 4th House: inability to build real estate or property, lack of domestic luxury and physical comfort, and delayed or slowed income flow.',
        5: 'Sun in 5th House: delays or complications in childbirth requiring medical intervention. If a child is born, the child possesses Rahu-like restless intelligence, misdirecting their sharp mind into arguments or wrong avenues.',
        6: 'Sun in 6th House: troubles from children, friction with in-laws, career struggles, eye problems, early hair loss, or premature graying of hair.',
        7: 'Sun in 7th House: severe marital discord, frequent disputes, and fundamental disagreements with the spouse.',
        8: 'Sun in 8th House: weakens personal fortune and brings continuous, unexplained financial or material losses.',
        9: 'Sun in 9th House: friction and disagreements with father, inability to find a good mentor or teacher, financial losses during long-distance travels, and reduced luck.',
        10: 'Sun in 10th House: prevents social status from building up, causes public humiliation, and brings false allegations for actions never committed.',
        11: 'Sun in 11th House: inability to generate steady profits, isolation from friends/relatives, or friends becoming a source of trouble.',
        12: 'Sun in 12th House: severe sleep disturbances (excessive sleep, insomnia, or delayed sleep), and marital arguments before sleeping.',
      },
      environmental: [
        'An empty plot, barren land, or deserted park in front of the house or visible from the balcony, often where garbage accumulates.',
        'A large drain or open gutter located near the residence or directly at the doorstep.',
        'The house directly opposite often faces difficulties regarding a male child (either no male issue, or frequent disputes with him).',
      ] },
    2: { theme: 'Dhana & Kutumba Bhava', tone: 'neutral',
      intro: 'The 2nd house rules hard-earned wealth, family resources, and personal speech. Rahu here creates fluctuating financial conditions.',
      positive: [],
      negative: [
        '"Swinging fortune" — luck depends heavily on external factors or elder siblings; resources and opportunities often come through references or secondary contacts.',
        'A potential childhood habit of taking small amounts of money from places of worship to buy personal items.',
        'A toilet situated in the North-West or North of the residence causes heavy financial drain and unfulfilled personal desires.',
        'Can cause strained relations with in-laws or unexpected financial hurdles if afflicted.',
      ],
      conditional: [
        { text: 'Special combination: if Rahu sits in the 2nd house while Saturn occupies the 1st house, it forms a powerful yoga for immense wealth creation, especially after the age of 30.' },
      ] },
    3: { theme: 'Sahaja & Parakrama Bhava', badge: 'One of Rahu\u2019s most auspicious houses', tone: 'good',
      intro: 'The 3rd house governs short travels, personal courage, effort, communication, and siblings — considered one of the most auspicious placements for Rahu.',
      positive: [
        'The native\u2019s in-laws are typically influential, prosperous, and well-established in life.',
        'Grants extraordinary intuitive foresight — often sensing future events six months to two years before they happen, including through dreams.',
      ],
      negative: [
        'The native\u2019s brother may experience career struggles or a prolonged effort establishing himself.',
        'Money lent to friends or relatives rarely returns — best treated as a voluntary gift.',
      ],
      conditional: [
        { text: 'The native\u2019s fortune here shines in direct proportion to how strong Jupiter is placed in the birth chart.' },
      ] },
    4: { theme: 'Sukha & Matru Bhava', tone: 'neutral',
      intro: 'The 4th house represents domestic happiness, mother, home environment, and peace of mind. Rahu here is generally peaceful but sensitive to structural changes.',
      positive: [
        'Promotes good relations with in-laws, who often experience significant wealth growth after the native\u2019s marriage.',
        'Because the 4th house naturally belongs to the Moon, Rahu stays relatively calm here, resembling peace in a mother\u2019s lap.',
      ],
      negative: [
        'Reconstructing the house roof, demolishing/rebuilding staircases, or breaking and remodeling toilets severely triggers Rahu\u2019s negative side, leading to legal notices, court litigation, and serious dangers.',
        'A dumping ground, railway line/tracks, or public toilet near or directly in front of the residence is a notable warning sign.',
        'Frequent changes in business or profession, inability to stay fixed in one workplace, and a habit of staying awake late at night.',
      ],
      remedy: 'Bathing with holy water (such as Ganga water) helps calm this planetary energy.' },
    5: { theme: 'Putra & Purva Punya Bhava', tone: 'bad',
      intro: 'The 5th house governs progeny, intellect, creativity, and romantic relationships.',
      positive: [],
      negative: [
        'Indicates the possibility of two marriages — either marrying the same partner twice, or having two different marital partners.',
        'Causes difficulties in conceiving, pregnancy issues, or miscarriages.',
        'Often indicates that the native\u2019s paternal or maternal grandfather had two marriages.',
        'If children are born, they may face significant life struggles — academic setbacks, unsettled careers, or turbulent marital lives.',
      ],
      environmental: [
        'Garbage/dustbins placed right at the house entrance threshold, or a drain at the doorstep, signify negative Rahu results here.',
      ] },
    6: { theme: 'Ari & Shatru Bhava', badge: 'Exceptionally strong here', tone: 'good',
      intro: 'The 6th house rules disease, enemies, competition, and debts — Rahu here is exceptionally strong and formidable.',
      positive: [
        'Enemies cannot stand before the native. The more people criticize or oppose the native, the higher the native rises in fame and prosperity; the native should never retaliate directly, as Rahu naturally neutralizes opponents.',
        'Provides extraordinary protection during extreme legal or personal crises — when the native appears trapped without escape, Rahu suddenly creates an unexpected way out.',
      ],
      negative: [
        'If the native mistreats brothers or cheats friends, negative Rahu introduces recurring illnesses into the household, causing heavy medical expenditure.',
        'Bestows a highly sharp brain, but can occasionally make the native or family members vulnerable to paranormal sensitivities or negative subtle energies.',
      ] },
    7: { theme: 'Yuvati & Kalatra Bhava', tone: 'bad',
      intro: 'The 7th house governs marriage, spouse, and public business partnerships.',
      positive: [
        'Highly favorable and profitable for businesses involving electrical goods, power equipment, or electronics.',
      ],
      negative: [
        'After marriage, the spouse frequently experiences recurring headaches or acidity/gas issues.',
        'Marriage before age 21 is strongly discouraged, as it can lead to early spousal death or divorce — marriage should occur after 21.',
        'The spouse may remain overly suspicious, frequently search for reasons to argue, or suffer health vulnerabilities.',
      ] },
    8: { theme: 'Randhra & Ayur Bhava', tone: 'neutral',
      intro: 'The 8th house rules longevity, sudden transformation, hidden knowledge, and occult sciences.',
      positive: [
        'Creates intense interest in astrology, occult subjects, mantra chanting, and hidden mysteries.',
      ],
      negative: [
        'In-laws often withhold crucial facts or tell lies during marriage negotiations, which come to light post-marriage.',
        'Sudden wall dampness (seepage) in the residence, or ground-floor tiles/flooring sinking inward, indicates afflicted Rahu.',
        'High risk of sudden betrayal by trusted individuals — the native must earn money with absolute honesty, as a single dishonestly-earned rupee can result in thousands in unexpected losses.',
      ],
      remedy: 'Aligning with astrology or occult sciences helps balance this energy.' },
    9: { theme: 'Dharma & Bhagya Bhava', tone: 'neutral',
      intro: 'The 9th house signifies higher learning, father, fortune, and religious beliefs. Situated in Jupiter\u2019s natural house, Rahu behaves with relative restraint.',
      positive: [],
      negative: [
        'Can cause miscarriages for the wife, particularly during the second child\u2019s conception.',
        'Reduced happiness or distance from the paternal grandfather, often due to early passing or physical separation.',
        'Being an atheist severely harms the native here — maintaining faith in God, deities, and spiritual traditions brings highly positive results.',
        'Inclines the native toward inter-caste or inter-religious romantic relationships or physical intimacy.',
      ],
      remedy: 'Respecting elders, gurus, and spiritual traditions is vital.' },
    10: { theme: 'Karma Bhava', badge: '"Rahu in the 10th brings the world under control"', tone: 'good',
      intro: 'The 10th house rules career, authority, public status, and profession — an exceptionally potent placement for Rahu.',
      positive: [
        'The native must not become miserly — spending money on personal enjoyment and hobbies actually stimulates career growth.',
        'Often chooses a career path completely different from family tradition.',
        'Premature graying of hair is common, and considered fortunate here — the native should never dye it black; covering the head with a cap or scarf is recommended for luck and protection.',
      ],
      negative: [],
      conditional: [
        { text: 'If Saturn sits alongside Rahu in the 10th house, it creates a billionaire yoga, enabling massive wealth accumulation and career expansion.' },
      ] },
    11: { theme: 'Labha Bhava', tone: 'neutral',
      intro: 'The 11th house governs monetary gains, social networks, and desires.',
      positive: [
        'Generates substantial wealth and income, and possesses a magnetic presence that easily attracts public attention in social gatherings.',
      ],
      negative: [
        'Proves unfavorable for the father — causing financial debts, health complications, or business losses for him.',
        'High risk of early-onset diabetes or blood sugar complications; excessive sweets should be strictly avoided.',
        'Periodic distress or complications arising from friends and relatives.',
        'Excessive aluminum utensils in the house, or toilets situated in the East or West direction, drain wealth accumulation.',
      ] },
    12: { theme: 'Vyaya & Moksha Bhava', tone: 'neutral',
      intro: 'The 12th house represents expenses, foreign lands, bedroom comforts, and isolation.',
      positive: [
        'Strong desire to work abroad, travel to foreign countries, or build connections with foreign entities.',
      ],
      negative: [
        'Heightened physical/sexual desires (particularly for males), along with spending on sensual pleasures.',
        'A shaky, unstable, or damaged double bed in the bedroom directly creates severe sleep disorders and must be repaired.',
        'Involvement in illegal activities creates severe risks of imprisonment or legal notices; strained relations with sisters severely harms financial earnings.',
      ],
      remedy: 'Gifting items and keeping sisters happy boosts wealth.' },
  },

  Ketu: {
    1: { theme: 'Ascendant / Tanu Bhava', tone: 'neutral',
      intro: 'When Ketu resides in the 1st house, it directly impacts the native\u2019s self-identity, mindset, body, and overall perspective on life.',
      positive: [
        'Remarkably sharp intuitive powers — upon meeting someone, the native instantly understands their character, tone, and true motives, and can intuitively sense upcoming events.',
        'The 1st house represents personality already established strongly in past lives; Ketu hides a special artistic talent or unique skill that can emerge suddenly at any stage of life.',
      ],
      negative: [
        'Because the 1st house governs thought process and mindset, Ketu introduces inherent confusion — the native frequently doubts their own decisions and seeks a second opinion for almost everything.',
        'Ketu fills the individual with sudden nervousness and anxiety — a feeling of being stranded in a pitch-black place, leading to rapid panic over minor everyday issues.',
      ] },
    2: { theme: 'Dhana & Kutumba Bhava', tone: 'neutral',
      intro: 'The 2nd house governs hard-earned money, family, speech, and oral expression. Ketu\u2019s placement here alters financial dynamics and communication habits.',
      positive: [
        'Having spoken extensively in past lives, the individual does not talk excessively in this life — speech is concise, precise, and direct, with a natural talent to be a powerful speaker.',
        'If the person spends freely on personal desires, hobbies, and helping others without hesitation, Ketu rewards them with extreme wealth and continuous money flow, aligned with Ketu\u2019s principle of "letting go."',
      ],
      negative: [
        'The native feels emotionally detached from accumulating wealth and shows little interest in everyday household chatter.',
        'Conversely, if the person is overly stingy, hoards money, and obsessively calculates every penny, Ketu can make them financially poor and struggling throughout life.',
        'Often creates emotional aloofness from family members, but an intense interest in astrology and occult wisdom — frequently found in distinguished astrological scholars.',
      ] },
    3: { theme: 'Sahaja & Parakrama Bhava', tone: 'neutral',
      intro: 'The 3rd house rules short journeys, initiating tasks, physical exertion, online activities, and marketing.',
      positive: [],
      negative: [
        'Detaches the native from grueling manual effort — they feel their personal way of doing a task is the only correct approach, leading them to ignore alternative perspectives.',
        'Because they insist on their own mindset, such individuals are often characterized as stubborn.',
        'Because Ketu causes mental confusion, the native experiences confusion right before initiating any new task, and can be orthodox or unyielding in personal ideology.',
        'In rare cases, can create friction or lack of harmony with siblings.',
      ] },
    4: { theme: 'Sukha & Matru Bhava', tone: 'bad',
      intro: 'The 4th house represents domestic happiness, emotional comfort, family environment, property, and mother — Ketu here creates a tug-of-war between worldly attachment and spiritual detachment.',
      positive: [
        'Prefers reading spiritual or philosophical books and shows little interest in worldly luxuries.',
      ],
      negative: [
        'The 4th house represents material comforts and emotional attachment, while Ketu demands non-attachment — this conflict makes standard domestic happiness generally uncomfortable here.',
        'A tendency to live away from family or feel detached from household duties.',
        'Because Ketu rules the lower body, the native\u2019s mother may suffer health problems there — knee pain, leg issues, or lower back troubles.',
        'Rarely feels an intrinsic desire to accumulate real estate or build a property portfolio, unless pushed into it by family or spouse.',
      ] },
    5: { theme: 'Putra & Purva Punya Bhava', tone: 'neutral',
      intro: 'The 5th house governs education, intellect, happiness, sports, children, and past-life merit — Ketu\u2019s alignment here creates perfect synergy with past-life karmic connections.',
      positive: [
        'Bestows rich creative potential and artistic inclination, capable of triggering sudden, overnight fame after years in complete obscurity.',
        'Enables substantial wealth, widespread respect, and a royal lifestyle, especially once the Ketu Dasha activates.',
      ],
      negative: [
        'May cause lack of focus or interruptions in formal education, leading to average academic performance.',
        'Creates detachment regarding children — difficulty conceiving, children moving far away after growing up, or a total lack of personal desire to have children.',
      ] },
    6: { theme: 'Ari & Shatru Bhava', badge: 'Good for becoming debt-free', tone: 'good',
      intro: 'The 6th house rules disease, hidden enemies, and debts — Ketu here creates mysterious health issues alongside excellent debt-clearing potential.',
      positive: [
        'Excellent placement for becoming debt-free — the native cannot tolerate carrying loans or EMIs, and makes extreme efforts to pay off liabilities quickly.',
        'Highly favorable for working in foreign countries, studying abroad, or living far from the birthplace (since Rahu sits directly opposite in the 12th house).',
      ],
      negative: [
        'As an unseen shadow planet, Ketu causes health conditions that defy conventional diagnosis — the native feels sick internally, yet lab reports come back normal.',
        'Gives rise to hidden enemies who present themselves as close friends while secretly undermining the native; strong intuition helps sense these threats, though Ketu\u2019s confusion may cause the native to doubt their own instincts.',
      ] },
    7: { theme: 'Yuvati & Kalatra Bhava', tone: 'bad',
      intro: 'The 7th house governs marriage, life partner, and business partnerships.',
      positive: [
        'Marrying a partner with high intellectual caliber or spiritual inclination satisfies Ketu\u2019s demands and helps keep the marriage intact.',
      ],
      negative: [
        'Generally unfavorable for routine marital happiness, creating ongoing dissatisfaction — statistically observed in a high proportion of marital separation and divorce cases.',
        'Ketu represents supreme wisdom and can only function smoothly with a spouse who is exceptionally smart or deeply elevated spiritually; without that compatibility, emotional distance inevitably arises.',
        'Induces emotional or operational detachment from business partners.',
      ] },
    8: { theme: 'Randhra & Ayur Bhava', badge: 'Very comfortable placement', tone: 'good',
      intro: 'The 8th house rules secrets, sudden gains or losses, deep transformation, and Samadhi — Ketu feels completely at home here.',
      positive: [
        'Involves the individual in intense spiritual discussion, deep research, meditation, and topics dealing with hidden treasures or exploration.',
        'Excellent placement for studying astrology, Tantra, and occult wisdom — elevates intuition to extraordinary levels, enabling the native to discover new astrological methodologies.',
      ],
      negative: [] },
    9: { theme: 'Dharma & Bhagya Bhava', tone: 'neutral',
      intro: 'The 9th house represents fortune, father, spiritual master, higher learning, and religious tradition.',
      positive: [
        'The native strongly believes life progress depends on conscious action (karma) rather than blind reliance on luck.',
        'Ketu\u2019s best friend in astrology is Jupiter — when Ketu and Jupiter sit together or align, the person becomes extraordinarily wise, knowledgeable, and prosperous.',
        'Grants strong academic interests and excellent opportunities to travel abroad for higher studies.',
      ],
      negative: [
        'Understands the deep philosophy of religion rather than superficial trends, and cannot tolerate insults to spiritual roots — if afflicted, this can manifest as rigid religious fanaticism.',
      ] },
    10: { theme: 'Karma Bhava', tone: 'neutral',
      intro: 'The 10th house governs career, workplace environment, work style, and professional standing.',
      positive: [
        'With the support of modern technology and proper mentor guidance, the native can transform work patterns for themselves and others.',
        'Indifferent to public fame or social status, perfectly comfortable living a quiet or low-profile life; physical exercise, sports, and mentor guidance help maintain balanced energy.',
      ],
      negative: [
        'Dislikes rigid corporate routine or standard "rat races," seeking to conserve physical energy through smart, intellectual work instead.',
        'Professional career and personal passions often differ completely (e.g., a corporate job alongside deep expertise in astrology or geopolitics).',
      ] },
    11: { theme: 'Labha Bhava', badge: 'Manifestation power', tone: 'good',
      intro: 'The 11th house rules social circles, achievements, monetary gains, and greed — Ketu calls for letting go of desire here.',
      positive: [
        'Bestows a unique power of manifestation — what the native writes down with clear intention frequently comes true in real life.',
        'By dropping obsessive greed and writing aspirations clearly as a meditative practice, Ketu rewards the native with tremendous wealth and unexpected achievements.',
      ],
      negative: [
        'Over time, the native distances from casual social crowds, surrounding themselves only with a few companions of genuine spiritual maturity or intellectual depth.',
      ] },
    12: { theme: 'Vyaya & Moksha Bhava', badge: 'Highly harmonious placement', tone: 'good',
      intro: 'The 12th house signifies spiritual liberation, detachment, foreign lands, and solitude — because both the house and Ketu represent non-attachment, this is a highly harmonious placement for spiritual growth.',
      positive: [
        'Grants deep inner peace, a calm and comfortable old age, and a serene, peaceful transition later in life.',
        'Fosters intense interest in spiritual philosophy, esoteric wisdom, and tantric disciplines.',
      ],
      negative: [
        'Frequently leads to leaving the native\u2019s birthplace early for studies or career.',
      ] },
  },

  Jupiter: {
    1: { theme: 'Knowledge, Pure Heart, Intellectual Pride, Business Expansion', tone: 'good',
      intro: 'Jupiter in the 1st house gives a pure heart, vast knowledge, and a strong drive for learning and business growth — though it can also bring intellectual ego and a fiery temper.',
      positive: [
        'A pure heart, deep knowledge, and natural wisdom; joy comes from business growth, expansion across regions, and learning new skills.',
        'A Peepal tree is often present near the birthplace or growing naturally on the home roof; respected for wisdom when guiding or teaching others.',
      ],
      negative: [
        'Pride of knowledge ("ego of wisdom"), thinking no one matches their level; frequent job changes due to ego clashes with bosses or superiors.',
        'Struggle expressing personal emotions, restless running around for learning.',
        'Health sensitivity: women may face thyroid issues after the 2nd child; potential health issues for siblings.',
      ] },
    2: { theme: 'Wealth, Family Responsibility, Nepotism Caution', tone: 'good',
      intro: 'Placed in the 2nd house of family and wealth, Jupiter brings monetary abundance, but family ties require carefully balanced boundaries.',
      positive: [
        'Strong financial standing and ability to accumulate wealth; a gracious host who thrives when relatives and guests visit.',
        'A deep protective instinct toward family members and relatives.',
      ],
      negative: [
        'Unfavorable if the 8th house is completely empty (benefits from having a planet there).',
        'Tendency toward nepotism (favoring family over deserving individuals), which can lead to late-life regret or loneliness in old age.',
        'Staying for long durations at in-laws\u2019, sister\u2019s, or maternal grandmother\u2019s home tends to cause difficulties.',
      ] },
    3: { theme: 'Lion-like Courage, Help from High Authorities, Learning Process', tone: 'good',
      intro: 'Jupiter in the 3rd house grants immense confidence, support from influential people, and a protective nature toward loved ones.',
      positive: [
        'Fearless, brave, and extremely soft-hearted toward genuine people; receives strong assistance from people in higher authority.',
        'Supportive siblings and a willingness to try creative, original paths.',
      ],
      negative: [
        'Reluctant to admit mistakes and prone to self-praise; unforgiving and relentless if betrayed or mistreated.',
        'In this "learning stage" of Jupiter, may invent unconventional theories without deep formal knowledge.',
      ],
      remedy: 'Worship Goddess Durga, perform Kanya Puja, and show deep respect to women both at home and outside.' },
    4: { theme: 'Exaltation, Maternal Blessing, Quick Grasping Power', badge: 'Exalted (Cancer)', tone: 'good',
      intro: 'Jupiter is exalted in the 4th house — grants quick learning skills, strong maternal blessings, and often a temple or gurudwara near the birthplace.',
      positive: [
        'Fast learning ability and deep intuitive grasp of complex topics; strong maternal influence, a noble mother, and an influential lineage/father.',
        'A temple or Gurudwara is often situated near the birth house or hospital.',
      ],
      negative: [
        'Early-life struggles; opinions may clash with the father despite being close to the mother.',
        'The job often involves frequent travel; can lack patience to teach slow or weaker learners.',
      ],
      remedy: 'Keep the chest properly covered at all times.',
      conditional: [
        { text: 'If Mercury is in the 10th house, this combination gives world-changing advice that saves others\u2019 boats.' },
      ] },
    5: { theme: 'Hunger for Wisdom, Prosperity via Children, Born Teacher', tone: 'good',
      intro: 'A natural house for Jupiter — creates a lifelong student, born teacher, and brings family prosperity after the birth of a child.',
      positive: [
        'A constant thirst for knowledge at any age with a natural talent for teaching; a child\u2019s birth often triggers major family growth, promotions, or financial breakthroughs.',
        'Opportunities and income tend to come naturally without desperate struggle.',
      ],
      negative: [
        'Can dampen traditional romance or lead to distance in romantic pursuits.',
        'Vulnerability to digestive issues, acidity, or gut health sensitivity.',
        'Strict warning: never commercialize or monetize religion.',
      ],
      remedy: 'Worship Lord Ganesha, donate food in community kitchens (Bhandara), and support student education.',
      conditional: [
        { text: 'If Rahu is in the 5th or 9th house, there is a risk of severe financial loss requiring urgent remedies.' },
      ] },
    6: { theme: 'Maternal Support, Liquidity Caution, Service', tone: 'neutral',
      intro: 'Jupiter in the 6th house highlights the role of maternal uncles as lucky figures, but requires careful cash liquidity management.',
      positive: [
        'Maternal uncles bring good luck and supportive guidance; an innate desire to resolve difficulties and serve others in times of need.',
      ],
      negative: [
        'Cash liquidity struggles and erratic cash flow.',
        'Potential marital friction in a maternal aunt\u2019s life.',
      ],
      conditional: [
        { text: 'Major health or life challenges for the father around ages 16-19 are indicated if Mercury is afflicted in the 2nd or 12th house.' },
      ] },
    7: { theme: 'Post-Marriage Luck, Householder-Sadhu Dilemma, Boundaries', tone: 'good',
      intro: 'Jupiter in the 7th house brings good fortune after marriage, but creates an inner dilemma between spiritual inclinations and household duties.',
      positive: [
        'A significant rise in luck, status, and stability following marriage; the spouse brings wise counsel, and listening to them benefits personal health and well-being.',
        'A fondness for books and maintaining a home library collection.',
      ],
      negative: [
        'A "household sadhu" dilemma — an inclination toward spirituality during active family years.',
        'Difficulty saying "no," which can lead to unintentional relationship complications; neglecting personal self-care and physical health.',
      ],
      remedy: 'Keep religious books/pictures out of the bedroom. As a one-time remedy for relationship distress, keep a glass of milk by your bedside at night and pour it under a thorny plant/tree in the morning.' },
    8: { theme: 'Uplifting Speech, Mountain Love, Character Protection', tone: 'neutral',
      intro: 'In the 8th house, Jupiter possesses the power to "revive the dead" through deeply inspiring speech, though public reputation requires strict safeguards.',
      positive: [
        'Highly inspiring speech that instantly uplifts depressed or broken individuals; steady work-from-home or remote income opportunities, with job searches resolving quickly.',
        'A deep love for mountains/hills, often planning retirement in hill stations; rumors or misunderstandings tend to clear up smoothly in the end.',
      ],
      negative: [
        'Vulnerable to false rumors or scandal regarding the opposite gender — must maintain strict character boundaries and distance.',
        'Risk of taking credit for others\u2019 work if moral caution is ignored.',
      ],
      remedy: 'Wear pure gold on the body and maintain impeccable moral character.' },
    9: { theme: 'Ancestral Blessings, Family Traditions, High Morals', badge: 'Natural house — very strong', tone: 'good',
      intro: 'Jupiter is in its natural home in the 9th house — brings divine good luck, ancestral blessings, and high moral discipline.',
      positive: [
        'Strong divine protection, good luck, and blessings of elders and ancestors; strictly follows rules and instills discipline in others.',
      ],
      negative: [
        'Must honor family traditions carefully (e.g., an inter-caste marriage against ancestral norms can harm luck).',
        'Procrastination is the main threat to Jupiter\u2019s good fortune here.',
      ],
      conditional: [
        { text: 'Financial assistance from in-laws is indicated if Mars is in the 3rd house.' },
        { text: 'If Saturn is in the 5th house, there can be unhappiness regarding children, though financial wealth rises sharply after age 36.' },
      ] },
    10: { theme: 'Great Teacher, Saturnian Business, Selfless Knowledge', tone: 'good',
      intro: 'In Saturn\u2019s house, Jupiter creates a master teacher and successful professional in Saturnian industries (oil, steel, law, construction, real estate).',
      positive: [
        'A master teacher who selflessly imparts complete knowledge to students/juniors; great success in Saturnian fields.',
        'A strong professional reputation and dedication to duty.',
      ],
      negative: [
        'Students or subordinates may copy content or fail to give credit ("neki karo joote khao"); reluctance to ask for help due to ego, eventually growing fed up with ungrateful followers.',
      ],
      remedy: 'Apply Saffron (Kesar) tilak daily on forehead, tongue, and navel. Recite Gajendra Moksha Stotram.',
      conditional: [
        { text: 'If Venus and Mars are both in the 4th house, potential marital disharmony is indicated.' },
      ] },
    11: { theme: 'Service-Driven Gains, Quick Learner, Strict Morals', tone: 'good',
      intro: 'In the house of desires, Jupiter requires strict moral discipline — wealth shines brightly when the person focuses on serving others\u2019 needs rather than ego.',
      positive: [
        'A quick learner, highly creative, and fearless in execution; exceptional wealth and fulfillment when focusing on audience/client needs.',
        'Shines brightly in public service, teaching, content creation, and consulting.',
      ],
      negative: [
        'Can create friction in domestic life if personal desires outweigh moral rules.',
        'Strict lifestyle discipline is required: avoiding alcohol, non-vegetarian food, and illicit relationships.',
      ] },
    12: { theme: 'Spiritual Liberation, Noble Expenses, Foreign Residence', badge: 'Own sign (Pisces)', tone: 'good',
      intro: 'Jupiter in its own house in the 12th house represents spiritual wisdom, noble expenditures, foreign connections, and divine protection.',
      positive: [
        'Deep spiritual wisdom, inclination toward meditation, and inner peace; expenditures directed toward noble causes, charity, and religious deeds.',
        'Strong for success in foreign lands, institutions, research, or secluded reflection; a divine shield protecting against major crises or hidden enemies.',
      ],
      negative: [
        'High expenses and detachment from purely material wealth gathering.',
        'Needs balance between worldly responsibilities and spiritual withdrawal.',
      ] },
  },

};
