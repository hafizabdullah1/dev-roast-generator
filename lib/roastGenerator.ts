const intros = [
  "Bhaiyon aur behno, pesh-e-khidmat hai",
  "Dil thaam ke baitho, hamare saamne mash'hoor-e-zamana",
  "Wah, the one and only",
  "Aray, yeh toh wahi azeem shakhsiyat hai na,",
  "Yaqeen nahi aa raha ke is mahan aatma ko roast karna parh raha hai,",
  "Sab peeche hat jao, maidan mein inki entry ho chuki hai,"
];

const generalTraits = [
  "wo developer jiska dimaagh code se zyada Twitter pe chalta hai.",
  "wo coder jise lagta hai ke debugging ka matlab sirf console.log likhna hai.",
  "wo insaan jiske code mein logic kam aur 'if-else' ki dukaan zyada hai.",
  "wo azeem aatma jiska code kabhi pehli baar mein nahi chalta.",
  "wo developer jiska portfolio dekh ke lagta hai abhi bhi 2010 chal raha hai.",
  "wo masoom shakhs jiska sara waqt StackOverflow pe errors dhoondhne mein nikal jata hai.",
  "wo software engineer jiski zindgi ka maqsad bas 'npm install' karna reh gaya hai.",
  "wo AI enthusiast jo sirf wrapper API laga kar khud ko agla Elon Musk samajhne lagta hai."
];

const techTraits: Record<string, string[]> = {
  html_css: [
    "wo designer jise lagta hai ke HTML/CSS aane se wo software engineer ban gaya.",
    "wo insaan jo ek button ko center karne ke liye 40 line ki CSS likh deta hai.",
    "wo dev jiska sab se bada achievement 'marquee' tag lagana tha."
  ],
  frontend: [
    "wo azeem shakhs jiske dimaagh mein hamesha lagta hai ke backend wale farigh hain.",
    "wo developer jise abhi tak API calling mein CORS error rula deta hai.",
    "wo coder jiske har project ka size 500MB hota hai, sirf node_modules ki wajah se."
  ],
  backend: [
    "wo dev jisne zindagi mein kabhi user interface banane ki zehmat nahi ki.",
    "wo insaan jiske khayal mein UI/UX ka matlab sirf plain text dikhana hai.",
    "wo azeem hacker jo console pe commands likh kar khud ko pro samajhta hai."
  ],
  fullstack: [
    "wo full-stack developer jiska na frontend theek se chalta hai na backend.",
    "wo mahan coder jo aam si SQL query likhne mein 4 ghante laga deta hai.",
    "wo dev jisko lagta hai ke React aur Node ka thora sa idea hone pe wo senior engineer ban gaya."
  ],
  react: [
    "wo React developer jiska poora app sirf useEffect ki kripa pe chal raha hai.",
    "wo coder jise simple state manage karne ke liye bhi Redux daalne ki beemari hai.",
    "wo insaan jiska component itna bada hai ke scroll karte karte mouse ghis jaye.",
    "wo masoom jis ki aadhi zindagi Next.js ke hydration errors solve karne me nikal jati hai."
  ],
  node: [
    "wo Node dev jiska server roz 'unhandled promise rejection' pe crash ho jata hai.",
    "wo backend wizard jise abhi bhi nahi pata ke event loop aakhir kaam kaise karta hai.",
    "wo coder jisko lagta hai Express.js ke ilawa dunya mein koi dosra framework hi nahi hai."
  ],
  python: [
    "wo Python dev jiske indentation errors ne poori team ko sar dard diya hua hai.",
    "wo data scientist jiske machine learning models bas if-else statements ki dukaan hain.",
    "wo insaan jise lagta hai ke 'import ai' likhne se site intelligent ho jayegi."
  ],
  django: [
    "wo Django dev jise apni baari bhar kam views.py dekh kar khud hi chakkar aane lagte hain.",
    "wo developer jo Django admin panel setup karne ko hi bada project samajh leta hai."
  ],
  vue: [
    "wo Vue dev jiska aadhay se zyada din React walo se behas karne mein guzar jata hai.",
    "wo insaan jo Vue ki kitabon wali documentation padh padh ke hi satisfy ho jata hai."
  ]
};

const punchlines = [
  "Shayad apne laptop ko restart karne se tera dimaagh bhi kaam karne lag jaye?",
  "Teri commit history kisi buray khawab se kam nahi hai.",
  "Tumhara code dekh kar toh GitHub Copilot ne bhi istifa de diya.",
  "Is se zyada saaf code toh aam tor pe legacy PHP projects mein mil jata hai.",
  "Bhai tu waqai coder banna chahta tha ya ghalti se yahan aa gaya?",
  "Tumhara 'clean code' dekh ke lagta hai kisi bache ne keyboard pe haath mara hai.",
  "Bhai tere debugger se acha toh ek simple 'console.log' thik kar deta hai."
];

export function generateRoast(name: string, tech: string = ""): string {
  const intro = intros[Math.floor(Math.random() * intros.length)];
  let traitArray = generalTraits;

  if (tech) {
    const techKey = Object.keys(techTraits).find(k => tech.toLowerCase().includes(k));
    if (techKey) {
      traitArray = techTraits[techKey];
    }
  }

  const trait = traitArray[Math.floor(Math.random() * traitArray.length)];
  const punchline = punchlines[Math.floor(Math.random() * punchlines.length)];

  return `${intro} ${name}... woh ${trait} \n\n${punchline}`;
}
