/* Manifestation Time Ministries — site script
   ------------------------------------------------------------------
   CONFIG — fill these in before launch. Anything left empty is hidden
   or shows a polite "coming soon" message instead of a broken link.
*/
{
  const CONFIG = {
    pastorName: "", // e.g. 'Pastor John Doe' — shown in the Lead Pastor section
    youtube: "", // channel URL, e.g. 'https://www.youtube.com/@yourchannel' — Watch live opens <channel>/live
    x: "", // X (Twitter) profile URL
    youtubeLiveEmbed: "", // e.g. 'https://www.youtube.com/embed/live_stream?channel=UCxxxx'
    facebook: "https://www.facebook.com/manifestationtimeministries/",
    instagram: "",
    tiktok: "",
    whatsappCommunity: "", // church WhatsApp community invite link
    whatsappOrders: "", // number for shop orders, digits only e.g. '2348030000000'
    ministryWhatsApp: {
      women: "",
      youth: "",
      men: "",
      children: "",
      media: "",
    },
    bank: { name: "", accountName: "", accountNumber: "" },
    paystackKey: "", // Paystack public key for online giving + shop checkout
    formEndpoint: "", // URL that accepts POSTed JSON (Formspree, your backend, etc.)
  };
  window.__mtm = true;
  const YT_LIVE = CONFIG.youtube
    ? CONFIG.youtube.replace(/\/$/, "") + "/live"
    : "https://www.youtube.com/results?search_query=Manifestation+Time+Ministries+Port+Harcourt+live&sp=EgJAAQ%253D%253D";
  document.querySelectorAll("[data-yt]").forEach((a) => {
    a.href = YT_LIVE;
    a.target = "_blank";
    a.rel = "noopener";
  });

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const saveData = !!(
    navigator.connection &&
    (navigator.connection.saveData ||
      /2g/.test(navigator.connection.effectiveType || ""))
  );
  const small = () => innerWidth < 700;
  const naira = (n) => "₦" + Math.round(n).toLocaleString("en-NG");
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) =>
    String(s).replace(
      /[<>&"]/g,
      (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c],
    );
  const store = {
    get(k, d) {
      try {
        return JSON.parse(localStorage.getItem(k)) ?? d;
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    },
  };

  /* ---------------- Media (swap files in /assets for your own photos) ---------------- */
  // Real photography: free-to-use Unsplash photos (unsplash.com/license), loaded from Unsplash's CDN.
  // Replace any ID with your own photo URL, or drop a file into /assets with the same name.
  const REAL = {
    sanctuary: "photo-1438032005730-c779502df39b",
    friends: "photo-1725245997924-632b5673e18a",
    worship: "photo-1477281765962-ef34e8bb0967",
    "hero-poster": "photo-1478147427282-58a87a120781",
    preacher: "photo-1686354715614-beff1662c3a9",
    pastor: "photo-1497621122273-f5cfb6065c56",
    youth: "photo-1665397858112-06e206f9e5ae",
    celebrations: "photo-1593678820334-91d5f99be314",
    counselling: "photo-1740761027004-d607726d6636",
    outreach: "photo-1718001240922-fe12844faf9e",
    graduates: "photo-1593678780392-d3340cf3df7b",
    bible: "photo-1437603568260-1950d3ca6eab",
    women: "photo-1725245997915-f9ef3912267f",
    men: "photo-1632215734180-d8d7eae6164c",
    children: "photo-1543689604-6fe8dbcd1f59",
    media: "photo-1605067063351-f81bc6041251",
  };
  const PID = (n) => (n.startsWith("photo-") ? n : REAL[n]);
  const U = (n, w) =>
    PID(n)
      ? `https://images.unsplash.com/${PID(n)}?auto=format&fit=crop&q=78&w=${w}`
      : `assets/${n}.webp`;
  const IMG = (n, sm) => U(n, sm ? 800 : 1800);
  const pic = (n, alt = "", sizes = "(max-width:600px) 100vw, 33vw") =>
    `<img src="${U(n, 1200)}" srcset="${[480, 800, 1200, 1800, 2600].map((w) => `${U(n, w)} ${w}w`).join(", ")}" sizes="${sizes}" alt="${esc(alt)}" loading="lazy" decoding="async" data-local="assets/${REAL[n] && !/^(women|men|children|media)$/.test(n) ? n : "worship"}.webp">`;
  const POOL = [
    "worship",
    "preacher",
    "youth",
    "hero-poster",
    "celebrations",
    "counselling",
    "outreach",
    "graduates",
    "friends",
  ];

  /* ---------------- Data ---------------- */
  const verses = [
    [
      "One word from God can change all your wasted years of struggle for better",
      "Manifestation Time Ministries",
    ],
    [
      "The earnest expectation of the creature waiteth for the manifestation of the sons of God",
      "Romans 8:19",
    ],
    [
      "Delivered from the bondage of corruption into the glorious liberty of the children of God",
      "Romans 8:21",
    ],
    [
      "For this purpose the Son of God was manifested, that he might destroy the works of the devil",
      "1 John 3:8",
    ],
    ["God loveth a cheerful giver", "2 Corinthians 9:7"],
  ];

  const ministries = [
    {
      id: "women",
      name: "Women Ministry",
      img: "women",
      icon: "i-heart",
      tag: "Empowered women. Purposeful living.",
      desc: [
        "A community of women growing in faith, supporting one another and discovering their identity and purpose in Christ.",
        "Through fellowship, prayer, biblical teachings and shared experiences, we encourage women to become spiritually strong and purposeful in every area of life.",
      ],
      btn: "Join Women Ministry",
    },
    {
      id: "youth",
      name: "Youth Church",
      img: "youth",
      icon: "i-flame",
      tag: "Raising a generation that knows God.",
      desc: [
        "A place for young people to discover their identity in Christ, develop their faith, build meaningful relationships and fulfil their purpose.",
        "We encourage young people to grow beyond limitations, embrace godly values and become positive expressions of Christ in their generation.",
      ],
      btn: "Join Youth Church",
    },
    {
      id: "men",
      name: "Men Ministry",
      img: "men",
      icon: "i-users",
      tag: "Building men of faith, character and purpose.",
      desc: [
        "A fellowship committed to raising spiritually grounded men who demonstrate godly character, leadership, responsibility and service.",
        "Through prayer, the Word and fellowship, men are encouraged to grow in their relationship with God and fulfil their responsibilities in their homes, church and society.",
      ],
      btn: "Join Men Ministry",
    },
    {
      id: "children",
      name: "Children Church",
      img: "children",
      icon: "i-child",
      tag: "Building a foundation of faith from childhood.",
      desc: [
        "We believe children deserve an opportunity to know God and grow in His Word.",
        "Children Church provides a welcoming environment where children can learn biblical values, understand God's love and develop a strong foundation for their faith.",
      ],
      btn: "Learn more",
    },
    {
      id: "media",
      name: "Tech & Media",
      img: "media",
      icon: "i-yt",
      tag: "Using technology to spread the Gospel.",
      desc: [
        "The Tech & Media Ministry supports the church's communication and outreach through technology, media production and digital platforms.",
        "From live streaming and sound production to photography, video, graphics and digital communications, the team uses its skills to make the message of Christ accessible to more people.",
      ],
      btn: "Join Tech & Media",
    },
  ];

  const connectOpts = [
    {
      id: "first",
      href: "#first-timer",
      icon: "i-user",
      img: "photo-1593678820334-91d5f99be314",
      t: "First timer",
      d: "Worshipped with us for the first time? We would love to know you better.",
    },
    {
      id: "member",
      href: "#membership",
      icon: "i-home",
      img: "photo-1686354714602-e45b401b327b",
      t: "Become a member",
      d: "Make Manifestation Time Ministries your church family.",
    },
    {
      id: "prayer",
      href: "#prayer",
      icon: "i-hand",
      img: "photo-1740761026468-f0481e8431b0",
      t: "Prayer request",
      d: "Let us stand with you in prayer.",
    },
    {
      id: "join",
      href: "#join",
      icon: "i-users",
      img: "photo-1786292908784-86781520e207",
      t: "Join a ministry",
      d: "Discover your place and become actively involved.",
    },
    {
      id: "counsel",
      href: "#counselling",
      icon: "i-heart",
      img: "photo-1655720355810-fcdfd7a742b5",
      t: "Counselling",
      d: "Receive spiritual guidance and support.",
    },
    {
      id: "wa",
      href: "",
      icon: "i-wa",
      img: "photo-1442118325940-300e8fe327d2",
      t: "WhatsApp community",
      d: "Join our church WhatsApp community for updates and encouragement.",
    },
  ];

  // SAMPLE — replace with the church calendar
  const events = [
    {
      img: "photo-1720960292979-e83a74dc4586",
      t: "Miracle Service",
      d: "2026-11-22",
      time: "9:00 AM",
      place: "UBA Building (Top Floor)",
      cat: "Service",
      desc: "Worship, the Word and the ministry of the Holy Spirit. Come expecting a miracle.",
    },
    {
      img: "photo-1756367260219-b60e3cb90fa5",
      t: "Prophetic Prayer Meeting",
      d: "2026-11-28",
      time: "7:00 AM",
      place: "UBA Building (Top Floor)",
      cat: "Prayer",
      desc: "A Saturday morning of prophetic prayer and declarations for breakthrough.",
    },
    {
      img: "photo-1782136660529-1f12b16e5d76",
      t: "Youth Church Hangout",
      d: "2026-12-05",
      time: "4:00 PM",
      place: "UBA Building (Top Floor)",
      cat: "Fellowship",
      desc: "Young people connecting, sharing and growing together in faith.",
    },
    {
      img: "photo-1634334868772-05f2638a99bb",
      t: "Women Ministry Fellowship",
      d: "2026-12-12",
      time: "10:00 AM",
      place: "UBA Building (Top Floor)",
      cat: "Fellowship",
      desc: "Fellowship, prayer and the Word for women in every season.",
    },
    {
      img: "photo-1640544351861-930d12160bbb",
      t: "Carol & Thanksgiving Service",
      d: "2026-12-20",
      time: "9:00 AM",
      place: "UBA Building (Top Floor)",
      cat: "Special",
      desc: "Celebrating the birth of Christ with songs, the Word and thanksgiving.",
    },
    {
      img: "photo-1627451927203-a2ec52dfa827",
      t: "Crossover Service",
      d: "2026-12-31",
      time: "10:00 PM",
      place: "UBA Building (Top Floor)",
      cat: "Special",
      desc: "Cross into the new year in God's presence with praise and prophetic prayer.",
    },
  ];

  // SAMPLE products — replace with real items, prices and stock
  const products = [
    {
      id: "b1",
      cat: "Books & Publications",
      kind: "book",
      name: "One Word From God",
      desc: "A devotional on the power of God's Word to change wasted years.",
      price: 5000,
      stock: "In stock",
    },
    {
      id: "b2",
      cat: "Books & Publications",
      kind: "book2",
      name: "Manifest: Your Divine Potential",
      desc: "Teachings on discovering and fulfilling your God-given purpose.",
      price: 6500,
      stock: "In stock",
    },
    {
      id: "b3",
      cat: "Books & Publications",
      kind: "book3",
      name: "Prophetic Prayer Manual",
      desc: "Scripture-based prayers for freedom, restoration and breakthrough.",
      price: 3500,
      stock: "Low stock",
    },
    {
      id: "m1",
      cat: "Church Merchandise",
      kind: "tee",
      name: "Manifestation Tee",
      desc: "Soft cotton T-shirt with the Manifestation Time mark. Sizes S–XXL.",
      price: 8000,
      stock: "In stock",
    },
    {
      id: "m2",
      cat: "Church Merchandise",
      kind: "hoodie",
      name: "Word & Spirit Hoodie",
      desc: "Heavyweight hoodie for cool evenings and Saturday prayers.",
      price: 18000,
      stock: "Pre-order",
    },
    {
      id: "m3",
      cat: "Church Merchandise",
      kind: "cap",
      name: "Embroidered Cap",
      desc: "Adjustable cap with embroidered ministry logo.",
      price: 5500,
      stock: "In stock",
    },
    {
      id: "m4",
      cat: "Church Merchandise",
      kind: "mug",
      name: "Morning Devotion Mug",
      desc: "Ceramic mug printed with Romans 8:19.",
      price: 4500,
      stock: "In stock",
    },
    {
      id: "s1",
      cat: "Church Stickers & Accessories",
      kind: "stickers",
      name: "Sticker Pack",
      desc: "Six weatherproof stickers inspired by the ministry's message.",
      price: 1500,
      stock: "In stock",
    },
    {
      id: "s2",
      cat: "Church Stickers & Accessories",
      kind: "band",
      name: "Wall & Car Stickers",
      desc: "Large vinyl decals with “One Word. One Encounter.”",
      price: 2000,
      stock: "In stock",
    },
  ];
  const shopCats = [
    [
      "Books & Publications",
      "Discover books and Christian resources that encourage spiritual growth, strengthen faith and deepen your understanding of God's Word.",
      "i-book",
    ],
    [
      "Church Merchandise",
      "Represent Manifestation Time Ministries with branded clothing, accessories and other ministry merchandise.",
      "i-bag",
    ],
    [
      "Church Stickers & Accessories",
      "Explore branded stickers and accessories inspired by the ministry's identity and message.",
      "i-star",
    ],
  ];

  const giveCats = [
    [
      "Offering",
      "Give towards the ongoing work and activities of the ministry.",
      "i-heart",
    ],
    [
      "Monthly Thanksgiving Offering",
      "A dedicated expression of gratitude and thanksgiving to God.",
      "i-star",
    ],
    [
      "Church Project Offering",
      "Contribute towards designated church development projects and initiatives.",
      "i-home",
    ],
  ];

  const gallery = [
    ["photo-1498192467103-290f567eb3a3", "Worship"],
    ["photo-1583353482486-128db5c54f3e", "Praise night"],
    ["photo-1587143987442-ae0cc2508c31", "The Word"],
    ["photo-1667644585884-31b1710542d2", "Our church family"],
    ["photo-1542296120-cd8d3eb196d5", "Study and prayer"],
    ["photo-1508829040592-72f179f8a73f", "Surrender"],
    ["photo-1663232176421-a74051a8fbb6", "Thanksgiving"],
    ["photo-1686354714854-88af03979e2f", "Service"],
    ["photo-1533606225698-289460858797", "The sanctuary"],
  ];

  // Weekly schedule in West Africa Time (day: 0 = Sunday)
  const schedule = [
    { day: 0, h: 8, m: 0, dur: 60, name: "Sunday School of Ministries" },
    { day: 0, h: 9, m: 0, dur: 180, name: "Miracle Service" },
    { day: 3, h: 17, m: 30, dur: 120, name: "Bible Study" },
    { day: 6, h: 7, m: 0, dur: 150, name: "Prophetic Prayer Meeting" },
  ];

  /* ---------------- Product art (inline SVG, no image downloads) ---------------- */
  function productArtSVG(kind) {
    const R = "#8a5a2b",
      D = "#15100c",
      W = "#ffffff",
      P = "#f4ece1";
    const mark = (x, y, s, c = W) =>
      `<g transform="translate(${x} ${y}) scale(${s})"><circle r="20" fill="${c}" opacity=".95"/><path d="M-2.5-12h5v8h8v5h-8v12h-5V1h-8v-5h8z" fill="${c === W ? R : W}"/></g>`;
    const bg = `<rect width="300" height="300" fill="${P}"/><circle cx="150" cy="150" r="120" fill="#fff"/>`;
    const art = {
      book: `<g transform="rotate(-6 150 150)"><rect x="92" y="52" width="120" height="180" rx="4" fill="${R}"/><rect x="92" y="52" width="14" height="180" fill="#3e2612"/><text x="158" y="118" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="22" fill="${W}">ONE WORD</text><text x="158" y="142" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="16" fill="${W}">FROM GOD</text>${mark(158, 186, 0.9)}</g>`,
      book2: `<g transform="rotate(5 150 150)"><rect x="92" y="52" width="120" height="180" rx="4" fill="${D}"/><rect x="92" y="52" width="14" height="180" fill="#333"/><text x="158" y="120" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="30" fill="#d9a25f">MANIFEST</text><rect x="122" y="134" width="72" height="3" fill="${W}"/>${mark(158, 186, 0.9, "#d9a25f")}</g>`,
      book3: `<g><rect x="96" y="56" width="112" height="172" rx="4" fill="${W}" stroke="${D}" stroke-width="3"/><rect x="96" y="56" width="112" height="56" fill="${R}"/><text x="152" y="92" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="18" fill="${W}">PRAYER</text><g stroke="${D}" stroke-width="3" opacity=".25"><path d="M114 136h76M114 152h76M114 168h60M114 184h70"/></g></g>`,
      tee: `<path d="M100 70l30-16c5 12 35 12 40 0l30 16 28 36-26 18-12-10v122H110V114l-12 10-26-18z" fill="${D}"/>${mark(150, 130, 1)}<text x="150" y="182" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="15" fill="${W}">MANIFESTATION TIME</text>`,
      hoodie: `<path d="M104 78c10-24 82-24 92 0l26 30-22 22-10-10v116H110V120l-10 10-22-22z" fill="${R}"/><path d="M126 70c8 30 40 30 48 0" fill="#3e2612"/><rect x="124" y="176" width="52" height="30" rx="6" fill="#5a3a1c"/><text x="150" y="150" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="18" fill="${W}">WORD &amp; SPIRIT</text>`,
      cap: `<path d="M80 176c0-60 36-92 72-92s72 32 72 92z" fill="${D}"/><path d="M78 176c40 10 120 12 170 0-4 18-60 26-100 24-40-2-62-10-70-24z" fill="#222"/>${mark(152, 136, 1.1)}`,
      mug: `<rect x="88" y="90" width="110" height="130" rx="10" fill="${W}" stroke="${D}" stroke-width="4"/><path d="M198 118c34 0 34 70 0 70" fill="none" stroke="${D}" stroke-width="12"/><text x="143" y="150" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="20" fill="${R}">ROMANS</text><text x="143" y="176" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="26" fill="${D}">8:19</text>`,
      stickers: `<g transform="rotate(-10 120 120)"><rect x="70" y="70" width="90" height="90" rx="18" fill="${R}"/>${mark(115, 115, 1.2)}</g><g transform="rotate(8 190 170)"><circle cx="190" cy="170" r="48" fill="${D}"/><text x="190" y="166" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="15" fill="${W}">ONE WORD</text><text x="190" y="184" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="11" fill="#d9a25f">FROM GOD</text></g><rect x="88" y="196" width="70" height="34" rx="17" fill="#d9a25f"/><text x="123" y="219" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="13" fill="${W}">ARISE</text>`,
      band: `<ellipse cx="150" cy="150" rx="96" ry="58" fill="none" stroke="${R}" stroke-width="26"/><ellipse cx="150" cy="150" rx="96" ry="58" fill="none" stroke="#3e2612" stroke-width="3" stroke-dasharray="2 10"/><text x="150" y="104" text-anchor="middle" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="12" fill="${W}" transform="rotate(-2 150 104)">ONE WORD · ONE ENCOUNTER</text>`,
    };
    return `<svg viewBox="0 0 300 300" aria-hidden="true">${bg}${art[kind] || ""}</svg>`;
  }
  // Real product photos (Unsplash). Swap for photos of your actual merchandise when ready.
  const PRODUCT_PHOTOS = {
    book: "photo-1519764340700-3db40311f21e",
    book2: "photo-1784844149078-e580b938fd02",
    book3: "photo-1639690283395-b62444cf9a76",
    tee: "photo-1618354691373-d851c5c3a990",
    hoodie: "photo-1578768079052-aa76e52ff62e",
    cap: "photo-1519079754742-f83afaef6d35",
    mug: "photo-1542556398-9e1da7ad3669",
    stickers: "photo-1714859100552-3e432e8f3981",
    band: "photo-1625768376503-68d2495d78c5",
  };
  function productArt(kind) {
    const id = PRODUCT_PHOTOS[kind],
      fb =
        "data:image/svg+xml," +
        encodeURIComponent(
          productArtSVG(kind).replace(
            "<svg ",
            '<svg xmlns="http://www.w3.org/2000/svg" ',
          ),
        );
    return id
      ? `<img src="https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=600&h=600" srcset="https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=400&h=400 400w, https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=800&h=800 800w" sizes="(max-width:600px) 50vw, 300px" alt="" loading="lazy" decoding="async" data-local="${fb}">`
      : productArtSVG(kind);
  }

  /* ---------------- Render helpers ---------------- */
  const fmt = (d, o) =>
    new Date(d + "T12:00:00").toLocaleDateString("en-GB", o);
  function evCard(e, i) {
    return `<article class="card ev spot" data-reveal style="--d:${(i % 3) * 0.1}s"><div class="ev-im">${pic(e.img || POOL[i % POOL.length], e.t, "(max-width:600px) 100vw, 33vw")}<span class="ev-cat">${e.cat}</span></div><div class="top"><div class="date"><small>${fmt(e.d, { month: "short" })}</small><b>${fmt(e.d, { day: "numeric" })}</b></div>
  <div><h3>${e.t}</h3></div></div><p>${e.desc}</p>
  <div class="foot"><span><svg class="ico"><use href="#i-cal"/></svg>${fmt(e.d, { weekday: "long" })}</span><span><svg class="ico"><use href="#i-clock"/></svg>${e.time}</span><span><svg class="ico"><use href="#i-pin"/></svg>${e.place}</span></div></article>`;
  }
  function optCard(o, i) {
    const wa = o.id === "wa";
    const href = wa ? CONFIG.whatsappCommunity || "#" : o.href;
    return `<a class="opt" href="${href}" ${wa ? 'rel="noopener" data-wa' : "data-link"} data-reveal style="--d:${(i % 3) * 0.08}s"><div class="opt-im">${pic(o.img, "", "(max-width:600px) 100vw, 33vw")}</div><div class="opt-b"><span class="opt-ic"><svg class="ico"><use href="#${o.icon}"/></svg></span><b>${o.t}<svg class="ico"><use href="#i-arrow"/></svg></b><p>${o.d}</p></div></a>`;
  }

  if ($("#marquee"))
    $("#marquee").innerHTML = [...verses, ...verses]
      .map((v) => `<span>${v[0]}<em>${v[1]}</em></span>`)
      .join("");
  $("#homeOpts").innerHTML = connectOpts
    .map((o, i) => {
      const wa = o.id === "wa";
      return `<a class="crow" href="${wa ? CONFIG.whatsappCommunity || "#" : o.href}" ${wa ? 'rel="noopener" data-wa' : "data-link"} data-img="${o.img}" data-reveal style="--d:${i * 0.05}s"><span class="cr-th">${pic(o.img, "", "96px")}</span><b>${o.t}</b><span class="cr-d">${o.d}</span><span class="cr-go"><svg class="ico"><use href="#i-arrow"/></svg></span></a>`;
    })
    .join("");
  {
    const fl = $("#cfloat"),
      fimg = $("img", fl),
      list = $("#homeOpts");
    let fx = 0,
      fy = 0,
      tx = 0,
      ty = 0,
      on = false;
    if (fine && !reduce) {
      list.addEventListener("pointerover", (e) => {
        const r = e.target.closest(".crow");
        if (!r) return;
        if (fimg.dataset.cur !== r.dataset.img) {
          fimg.dataset.cur = r.dataset.img;
          delete fimg.dataset.fb;
          fimg.dataset.local = "assets/friends.webp";
          fimg.src = IMG(r.dataset.img, 1);
        }
        fl.classList.add("on");
        on = true;
      });
      list.addEventListener("pointerleave", () => {
        fl.classList.remove("on");
        on = false;
      });
      addEventListener("load", () =>
        setTimeout(
          () =>
            connectOpts.forEach((o) => {
              const p = new Image();
              p.src = IMG(o.img, 1);
            }),
          1500,
        ),
      );
      list.addEventListener(
        "pointermove",
        (e) => {
          tx = e.clientX;
          ty = e.clientY;
        },
        { passive: true },
      );
      const step = () => {
        fx += (tx - fx) * 0.14;
        fy += (ty - fy) * 0.14;
        if (on)
          fl.style.transform = `translate(${fx.toFixed(1)}px,${fy.toFixed(1)}px) translate(-50%,-60%) rotate(${((tx - fx) * 0.04).toFixed(2)}deg)`;
        requestAnimationFrame(step);
      };
      step();
    }
  }
  $("#duoShop").innerHTML = productArt("book") + productArt("tee");
  $("#connectOpts").innerHTML = connectOpts.map(optCard).join("");
  $("#gallery").innerHTML = gallery
    .map(
      ([n, cap], i) =>
        `<button class="g-item" data-g="${i}" data-reveal="zoom" style="--d:${(i % 3) * 0.08}s">${pic(n, cap, "(max-width:600px) 50vw, 25vw")}<span>${cap}</span></button>`,
    )
    .join("");
  if (CONFIG.pastorName)
    $$("[data-pastor-name], .ps-role").forEach(
      (el) =>
        (el.innerHTML = `<b>${esc(CONFIG.pastorName)}</b><br>Lead Pastor, Manifestation Time Ministries`),
    );

  // ministries: home tabs + full page rows + join list
  const macc = $("#minAcc");
  macc.innerHTML = ministries
    .map(
      (
        m,
        i,
      ) => `<div class="ma${i ? "" : " on"}" tabindex="0" role="button" aria-expanded="${!i}" data-ma>${pic(m.img, m.name, "(max-width:900px) 100vw, 40vw")}
  <div class="ma-in"><span class="opt-ic"><svg class="ico"><use href="#${m.icon}"/></svg></span><b>${m.name}</b><div class="ma-more"><p>${m.tag}</p><a class="btn sm white" href="#join" data-link data-ministry="${m.name}">${m.btn}<svg class="ico arr"><use href="#i-arrow"/></svg></a></div></div></div>`,
    )
    .join("");
  const pickMa = (el) => {
    $$(".ma", macc).forEach((x) => {
      const on = x === el;
      x.classList.toggle("on", on);
      x.setAttribute("aria-expanded", on);
    });
  };
  macc.addEventListener("click", (e) => {
    const it = e.target.closest("[data-ma]");
    if (it && !e.target.closest("a")) pickMa(it);
  });
  macc.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-ma]")) {
      e.preventDefault();
      pickMa(e.target);
    }
  });
  if (fine)
    macc.addEventListener("pointerover", (e) => {
      const it = e.target.closest("[data-ma]");
      if (it && !it.classList.contains("on")) pickMa(it);
    });
  $("#minRows").innerHTML = ministries
    .map(
      (
        m,
        i,
      ) => `<article class="mrow${i % 2 ? " flip" : ""}" id="min-${m.id}"><div class="mr-img" data-reveal="${i % 2 ? "right" : "left"}"><div class="par" data-speed="-0.07">${pic(m.img, m.name, "(max-width:900px) 100vw, 50vw")}</div></div>
  <div class="mr-txt" data-reveal="${i % 2 ? "left" : "right"}"><span class="opt-ic"><svg class="ico"><use href="#${m.icon}"/></svg></span><h2>${m.name}</h2><p class="min-tag">${m.tag}</p>${m.desc.map((p) => `<p class="lead">${p}</p>`).join("")}
  <div class="row-btns"><a class="btn magnetic" href="#join" data-link data-ministry="${m.name}">${m.btn}<svg class="ico arr"><use href="#i-arrow"/></svg></a>${CONFIG.ministryWhatsApp[m.id] ? `<a class="btn ghost" href="${CONFIG.ministryWhatsApp[m.id]}" rel="noopener"><svg class="ico"><use href="#i-wa"/></svg>WhatsApp group</a>` : ""}</div></div></article>`,
    )
    .join("");
  $("#waList").innerHTML = ministries
    .map((m) => {
      const u = CONFIG.ministryWhatsApp[m.id];
      return `<a class="wa" href="${u || "#"}" ${u ? 'rel="noopener"' : "data-wa"}><svg class="ico"><use href="#i-wa"/></svg>${m.name}<small>${u ? "Open WhatsApp group" : "Group link coming soon"}</small></a>`;
    })
    .join("");

  // socials
  const socials = [
    ["facebook", "Facebook", "i-fb"],
    ["instagram", "Instagram", "i-ig"],
    ["tiktok", "TikTok", "i-tt"],
    ["youtube", "YouTube", "i-yt"],
    ["whatsappCommunity", "WhatsApp", "i-wa"],
  ];
  const socialHTML = socials
    .filter(([k]) => CONFIG[k])
    .map(
      ([k, n, ic]) =>
        `<a class="soc" href="${CONFIG[k]}" rel="noopener"><svg class="ico"><use href="#${ic}"/></svg>${n}</a>`,
    )
    .join("");
  $("#socialsContact").innerHTML =
    socialHTML +
    (socials.some(([k]) => !CONFIG[k])
      ? '<span class="note">More channels coming soon.</span>'
      : "");
  $("#socialsFooter").innerHTML = socialHTML;
  $("#ghSoc").innerHTML = [
    ["x", "i-xlogo", "X"],
    ["facebook", "i-fb", "Facebook"],
    ["instagram", "i-ig", "Instagram"],
  ]
    .map(
      ([k, ic, n]) =>
        `<a href="${CONFIG[k] || "#"}" ${CONFIG[k] ? 'rel="noopener"' : "data-soon"} aria-label="${n}"><svg class="ico"><use href="#${ic}"/></svg></a>`,
    )
    .join("");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-soon]");
    if (a) {
      e.preventDefault();
      toast(`${a.getAttribute("aria-label")} link coming soon.`);
    }
  });
  $$("[data-social]").forEach((a) => {
    const u = CONFIG[a.dataset.social];
    if (u) {
      a.href = u;
      a.rel = "noopener";
    } else
      a.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Our YouTube channel link is coming soon.");
      });
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-wa]");
    if (a && a.getAttribute("href") === "#") {
      e.preventDefault();
      toast("WhatsApp group link coming soon. Use the form and we'll add you.");
    }
  });

  // events page
  const evCats = ["All", ...new Set(events.map((e) => e.cat))];
  const evTabs = $("[data-tabs=evf]");
  evTabs.innerHTML = evCats
    .map(
      (c) =>
        `<button role="tab" data-tab="${c}">${c === "All" ? "All programmes" : c}</button>`,
    )
    .join("");
  function renderEvents(cat) {
    const list = events.filter((e) => cat === "All" || e.cat === cat);
    $("#allEvents").innerHTML = list.length
      ? list.map(evCard).join("")
      : '<div class="empty">No programmes in this category yet.</div>';
    observeReveal($("#allEvents"));
  }

  // give categories + bank card
  $("#gcats").innerHTML = giveCats
    .map(
      ([t, d, ic], i) =>
        `<button class="gcat" data-gcat="${t}" data-reveal style="--d:${i * 0.08}s"><span class="opt-ic"><svg class="ico"><use href="#${ic}"/></svg></span><b>${t}</b><p>${d}</p></button>`,
    )
    .join("");
  const B = CONFIG.bank;
  const acct = (B.accountNumber || "").replace(/\s/g, "");
  $("#bankCard").innerHTML =
    `<div class="bk-top"><small>Bank transfer</small><svg class="bk-chip" viewBox="0 0 40 30" aria-hidden="true"><rect x="1" y="1" width="38" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M1 11h12M1 19h12M27 11h12M27 19h12M13 1v28M27 1v28" stroke="currentColor" stroke-width="1.2"/></svg></div>
  <small>Account name</small><div class="bk-name">${esc(B.accountName || "Manifestation Time Ministries")}</div>
  <small>Account number</small><div class="num">${acct ? esc(acct.replace(/(\d{4})(\d{3})(\d+)/, "$1 $2 $3")) : "•••• ••• •••"}</div>
  <div class="row"><div><small>Bank</small><div style="font-weight:700">${esc(B.name || "Bank name")}</div></div><button class="copy" data-copy="${esc(acct)}"><svg class="ico"><use href="#i-copy"/></svg>Copy number</button></div>`;

  // shop
  $("#shopCats").innerHTML = shopCats
    .map(
      ([t, d, ic]) =>
        `<button class="scat" data-scat="${t}"><span class="opt-ic"><svg class="ico"><use href="#${ic}"/></svg></span><b>${t}</b><p>${d}</p></button>`,
    )
    .join("");
  const shopTabs = $("[data-tabs=shopf]");
  shopTabs.innerHTML = ["All", ...shopCats.map((c) => c[0])]
    .map(
      (c) =>
        `<button role="tab" data-tab="${c}">${c === "All" ? "All products" : c.replace("Church ", "")}</button>`,
    )
    .join("");
  let shopCat = "All";
  const qty = {};
  function renderProds() {
    $("#prods").innerHTML = products
      .filter((p) => shopCat === "All" || p.cat === shopCat)
      .map((p, i) => {
        const q = qty[p.id] || 1,
          pre = p.stock === "Pre-order";
        return `<article class="prod" style="animation:panelIn .6s var(--ease) ${i * 0.05}s both"><div class="pr-im">${productArt(p.kind)}<span class="stock ${p.stock === "Low stock" ? "low" : pre ? "pre" : ""}">${p.stock}</span></div>
    <div class="pr-b"><small>${p.cat}</small><b>${p.name}</b><p>${p.desc}</p><div class="pr-row"><span class="price">${naira(p.price)}</span>
    <div class="qty" data-qty="${p.id}"><button type="button" data-d="-1" aria-label="Decrease quantity">−</button><span>${q}</span><button type="button" data-d="1" aria-label="Increase quantity">+</button></div></div>
    <div class="pr-acts"><button class="btn sm" data-add="${p.id}"><svg class="ico"><use href="#i-bag"/></svg>Add to cart</button><button class="btn sm ghost" data-buy="${p.id}">Buy now</button></div></div></article>`;
      })
      .join("");
  }
  renderProds();

  /* ---------------- Smart background photos ---------------- */
  {
    const dpr = Math.min(devicePixelRatio || 1, 2),
      w = Math.min(2600, Math.ceil((innerWidth * dpr) / 400) * 400);
    const bgIO = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          bgIO.unobserve(el);
          const url = `https://images.unsplash.com/${el.dataset.bg}?auto=format&fit=crop&q=78&w=${w}`,
            im = new Image();
          im.onload = () => {
            el.style.backgroundImage = `url(${url})`;
            el.classList.add("bg-in");
          };
          im.src = url;
        }),
      { rootMargin: "400px" },
    );
    document.querySelectorAll("[data-bg]").forEach((el) => bgIO.observe(el));
  }

  /* ---------------- Reveal + counters ---------------- */
  const revealIO = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        revealIO.unobserve(e.target);
      }),
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
  );
  function observeReveal(scope = document) {
    $$("[data-reveal], .clip", scope).forEach((el) => {
      if (!el.classList.contains("in")) revealIO.observe(el);
    });
  }

  /* ---------------- Tabs ---------------- */
  function setTab(tabs, id) {
    const btns = $$("[role=tab]", tabs);
    const btn = btns.find((b) => b.dataset.tab === id) || btns[0];
    if (!btn) return;
    btns.forEach((b) => {
      const on = b === btn;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
    });
    $$(":scope > [data-panel]", tabs.parentElement).forEach((p) =>
      p.classList.toggle("on", p.dataset.panel === btn.dataset.tab),
    );
    moveInk(tabs);
    if (tabs.scrollWidth > tabs.clientWidth)
      tabs.scrollTo({
        left: btn.offsetLeft - tabs.clientWidth / 2 + btn.offsetWidth / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    tabs.dispatchEvent(new CustomEvent("tab", { detail: btn.dataset.tab }));
  }
  function moveInk(tabs) {
    const ink = $(".ink", tabs),
      b = $("[aria-selected=true]", tabs);
    if (!ink || !b || !b.offsetWidth) return;
    ink.style.width = b.offsetWidth + "px";
    ink.style.transform = `translate(${b.offsetLeft}px,${b.offsetTop - 5}px)`;
  }
  const allTabs = $$("[data-tabs]");
  allTabs.forEach((tabs) => {
    tabs.insertAdjacentHTML(
      "afterbegin",
      '<span class="ink" aria-hidden="true"></span>',
    );
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[role=tab]");
      if (b) setTab(tabs, b.dataset.tab);
    });
    tabs.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
      const btns = $$("[role=tab]", tabs),
        i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      const n =
        btns[
          (i + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length
        ];
      n.focus();
      setTab(tabs, n.dataset.tab);
    });
  });
  evTabs.addEventListener("tab", (e) => renderEvents(e.detail));
  shopTabs.addEventListener("tab", (e) => {
    shopCat = e.detail;
    renderProds();
  });
  allTabs.forEach((t) => setTab(t, $("[role=tab]", t).dataset.tab));
  const refreshInks = () => allTabs.forEach(moveInk);
  document.fonts?.ready.then(refreshInks);

  /* ---------------- Accordion ---------------- */
  $$("[data-acc]").forEach((acc) =>
    acc.addEventListener("click", (e) => {
      const b = e.target.closest(".acc-item > button");
      if (!b) return;
      const item = b.parentElement,
        open = !item.classList.contains("open");
      $$(".acc-item", acc).forEach((i) => {
        i.classList.remove("open");
        $("button", i).setAttribute("aria-expanded", "false");
      });
      if (open) {
        item.classList.add("open");
        b.setAttribute("aria-expanded", "true");
      }
    }),
  );

  /* ---------------- Hero: title words, background video ---------------- */
  {
    let k = 0;
    $$("#heroTitle .ln").forEach((ln) => {
      ln.innerHTML = ln.textContent
        .split(" ")
        .map(
          (w) =>
            `<span class="w"><span style="transition-delay:${0.2 + k++ * 0.05}s">${w}</span></span>`,
        )
        .join(" ");
    });
  }
  const heroVideo = $("#heroVideo") || document.createElement("video"),
    vToggle = $("#vToggle") || document.createElement("button"),
    heroBg = $("#heroBg");
  const allowVideo = !reduce && !saveData;
  if (allowVideo && heroVideo.isConnected) {
    heroVideo.src = "assets/hero-480.mp4";
    heroVideo.play()?.catch(() => {});
  }
  const setV = (play) => {
    try {
      play ? heroVideo.play()?.catch(() => {}) : heroVideo.pause();
    } catch (e) {}
    vToggle.classList.toggle("paused", !play);
    vToggle.setAttribute(
      "aria-label",
      play ? "Pause background video" : "Play background video",
    );
  };
  if (!allowVideo) vToggle.classList.add("paused");
  vToggle.addEventListener("click", () => {
    if (!heroVideo.src)
      heroVideo.src = small() ? "assets/hero-480.mp4" : "assets/hero-720.mp4";
    setV(heroVideo.paused);
  });
  const vidIO = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) {
          if (!allowVideo || small()) return;
          if (!v.dataset.loaded) {
            $$("source", v).forEach((s) => (s.src = s.dataset.src));
            v.preload = "auto";
            v.load();
            v.dataset.loaded = 1;
          }
          v.play()?.catch(() => {});
        } else if (v.dataset.loaded) v.pause();
      }),
    { rootMargin: "150px" },
  );
  $$("[data-lazy-video]").forEach((v) => vidIO.observe(v));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) $$("video").forEach((v) => v.pause());
    else if (
      allowVideo &&
      current === "home" &&
      !vToggle.classList.contains("paused")
    )
      heroVideo.play()?.catch(() => {});
  });

  /* motes canvas — light, paused off-screen, fewer on phones */
  const cv = $("#motes"),
    cx2 = cv.getContext("2d");
  let motes = [],
    mouse = { x: -999, y: -999 },
    heroVisible = true,
    W = 0,
    H = 0;
  function sizeMotes() {
    const r = cv.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = r.width;
    H = r.height;
    if (!W || !H) return;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = saveData
      ? 0
      : Math.round(Math.min(small() ? 28 : 60, (W * H) / 18000));
    motes = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.5,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.55 + 0.2,
      ox: 0,
      oy: 0,
    }));
  }
  function drawMotes() {
    cx2.clearRect(0, 0, W, H);
    for (const p of motes) {
      if (!reduce) {
        p.y += p.vy;
        p.x += p.vx;
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y,
          d = Math.hypot(dx, dy);
        if (d < 130 && d > 0) {
          const f = ((130 - d) / 130) * 2.2;
          p.ox += (dx / d) * f;
          p.oy += (dy / d) * f;
        }
        p.ox *= 0.92;
        p.oy *= 0.92;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
      }
      cx2.beginPath();
      cx2.arc(p.x + p.ox, p.y + p.oy, p.r, 0, 6.283);
      cx2.fillStyle = `rgba(255,214,160,${p.a})`;
      cx2.fill();
    }
  }
  const heroEl = $("#hero");
  heroEl.addEventListener(
    "pointermove",
    (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    },
    { passive: true },
  );
  heroEl.addEventListener("pointerleave", () => {
    mouse.x = mouse.y = -999;
  });
  const heroIO = new IntersectionObserver((es) => {
    heroVisible = es[0].isIntersecting;
  });
  heroIO.observe(heroEl);

  /* ---------------- Router with curtain transition ---------------- */
  const pages = $$(".page"),
    names = pages.map((p) => p.dataset.page);
  const ALIAS = {
    "first-timer": ["connect", "first"],
    membership: ["connect", "member"],
    prayer: ["connect", "prayer"],
    counselling: ["connect", "counsel"],
    join: ["connect", "join"],
    mandate: ["about", null, "mandate"],
    terms: ["privacy", null, "terms"],
  };
  const TITLES = {
    about: "About Us",
    ministries: "Our Ministries",
    services: "Services",
    connect: "Connect With Us",
    events: "Events",
    live: "Watch Live",
    shop: "Shop",
    give: "Give",
    contact: "Contact Us",
    privacy: "Privacy Policy",
  };
  const curtain = $("#curtain");
  let current = null,
    busy = false,
    target = null,
    pending = null;
  function resolve(hash) {
    if (ALIAS[hash]) {
      const [p, tab, sec] = ALIAS[hash];
      return {
        page: p,
        tab: tab && [$("[data-tabs=cf]"), tab],
        scroll: tab ? "connectForms" : sec,
      };
    }
    return { page: names.includes(hash) ? hash : "home" };
  }
  function afterShow(r) {
    if (r.tab) setTab(r.tab[0], r.tab[1]);
    if (r.ministry) {
      const s = $("#jnMin");
      if (s) s.value = r.ministry;
    }
    if (r.scroll)
      setTimeout(() => {
        const el = document.getElementById(r.scroll);
        if (el)
          el.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
      }, 80);
  }
  function setPage(r) {
    current = r.page;
    pages.forEach((p) => p.classList.toggle("on", p.dataset.page === r.page));
    $$(".nav a").forEach((a) =>
      a.classList.toggle("on", a.getAttribute("href") === "#" + r.page),
    );
    document.title =
      r.page === "home"
        ? "Manifestation Time Ministries"
        : `${TITLES[r.page]} · Manifestation Time Ministries`;
    window.scrollTo({ top: 0, behavior: "instant" });

    requestAnimationFrame(() => {
      refreshInks();
      observeReveal($(`[data-page="${r.page}"]`));
      onScroll();
      if (r.page === "home") {
        sizeMotes();
        sizeHS();
      }
      afterShow(r);
    });
  }
  function go(hash, push = true, extra = {}) {
    const r = { ...resolve(hash), ...extra };
    closeMenu();
    closeCart();
    if (busy && hash === target) return;
    target = hash;
    if (push && location.hash !== "#" + hash) {
      try {
        history.pushState(null, "", "#" + hash);
      } catch (e) {
        location.hash = hash;
      }
    }
    if (r.page === current) {
      if (r.tab || r.scroll || r.ministry) afterShow(r);
      else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    if (reduce || busy) {
      setPage(r);
      return;
    }
    busy = true;
    curtain.classList.remove("out");
    void curtain.offsetWidth;
    curtain.classList.add("in");
    setTimeout(() => {
      setPage(r);
      curtain.classList.add("out");
      setTimeout(() => {
        curtain.classList.remove("in", "out");
        busy = false;
      }, 600);
    }, 460);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a) return;
    e.preventDefault();
    const extra = {};
    if (a.dataset.giveTab)
      extra.tab = [$("[data-tabs=give]"), a.dataset.giveTab];
    if (a.dataset.scroll) extra.scroll = a.dataset.scroll;
    if (a.dataset.ministry) extra.ministry = a.dataset.ministry;
    go(a.getAttribute("href").slice(1), true, extra);
  });
  addEventListener("popstate", () =>
    go(location.hash.slice(1) || "home", false),
  );
  addEventListener("hashchange", () =>
    go(location.hash.slice(1) || "home", false),
  );

  /* ---------------- Mobile menu ---------------- */
  const burger = $("#burger");
  function closeMenu() {
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }
  burger.addEventListener("click", () => {
    const open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $$(".mmenu a").forEach(
      (a, i) => (a.style.transitionDelay = open ? `${0.12 + i * 0.03}s` : "0s"),
    );
  });

  /* ---------------- Scroll: header, progress, parallax ---------------- */
  const hdr = $("#hdr"),
    prog = $("#progress"),
    totop = $("#totop"),
    ring = $("#totop circle");
  let lastY = 0,
    ticking = false,
    mx = 0,
    my = 0,
    tmx = 0,
    tmy = 0;
  function onScroll() {
    const y = scrollY,
      max = document.documentElement.scrollHeight - innerHeight,
      k = max > 0 ? y / max : 0;
    hdr.classList.toggle(
      "solid",
      y > 40 || current === "live" || current === "privacy",
    );
    hdr.classList.toggle(
      "away",
      current === "home" && innerWidth > 900 && y < heroEl.offsetHeight - 140,
    );
    hdr.classList.toggle(
      "hide",
      y > 500 &&
        y > lastY + 4 &&
        !document.body.classList.contains("menu-open"),
    );
    if (y < lastY - 4 || y < 500) hdr.classList.remove("hide");
    lastY = y;
    prog.style.transform = `scaleX(${k})`;
    totop.classList.toggle("on", y > 700);
    ring.style.strokeDashoffset = 151 - 151 * k;
    if (reduce) return;
    const page = $(`[data-page="${current}"]`);
    if (!page) return;
    if (current === "home") homeScroll();
    for (const el of $$("[data-speed]", page)) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) continue;
      const off =
        (r.top + r.height / 2 - innerHeight / 2) *
        +el.dataset.speed *
        (small() ? 0.5 : 1);
      el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)${el.classList.contains("vbg") ? " scale(1.15)" : ""}`;
    }
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
      }
    },
    { passive: true },
  );
  totop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }),
  );

  /* home scroll stories: statement word reveal, mandate scrolly, pinned horizontal cards */
  const sWords = $$("#statement .sw"),
    scWords = $$(".sc-words span"),
    scPanels = $$(".sc-panel"),
    hsec = $("#hscroll"),
    htrack = $("#homeOpts");
  let hsMax = 0;
  function sizeHS() {
    if (!hsec) return;
    const pin = innerWidth > 900 && !reduce;
    hsec.classList.toggle("pinned", pin);
    hsMax = pin ? Math.max(0, htrack.scrollWidth - innerWidth + 80) : 0;
    hsec.style.height = pin ? `calc(100svh + ${hsMax}px)` : "";
    if (!pin) htrack.style.transform = "";
  }
  const mcards = $$(".mcard");
  function homeScroll() {
    const vh = innerHeight;
    if (innerWidth > 700)
      mcards.forEach((c, i) => {
        const nx = mcards[i + 1];
        if (!nx) {
          c.style.transform = "";
          return;
        }
        const a = c.getBoundingClientRect(),
          b = nx.getBoundingClientRect();
        const k = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
        c.style.transform = `scale(${(1 - k * 0.06).toFixed(4)})`;
        c.style.filter = `brightness(${(1 - k * 0.35).toFixed(3)})`;
      });
    const st = $("#statement").getBoundingClientRect();
    const p = Math.min(
      1,
      Math.max(0, (vh * 0.85 - st.top) / (st.height + vh * 0.35)),
    );
    const lit = Math.round(p * sWords.length);
    sWords.forEach((w, i) => w.classList.toggle("lit", i < lit || reduce));
    let act = 0;
    scPanels.forEach((pn, i) => {
      const r = pn.getBoundingClientRect();
      if (r.top < vh * 0.55) act = i;
      pn.classList.toggle("act", i === act);
    });
    scPanels.forEach((pn, i) => pn.classList.toggle("act", i === act));
    scWords.forEach((w, i) => w.classList.toggle("on", i === act));
    if (hsMax) {
      const r = hsec.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, -r.top / hsMax));
      htrack.style.transform = `translate3d(${(-k * hsMax).toFixed(1)}px,0,0)`;
    }
  }

  /* hero video parallax + title drift */
  const heroTxt = $("#heroTxt");
  if (fine)
    addEventListener(
      "pointermove",
      (e) => {
        tmx = (e.clientX / innerWidth) * 2 - 1;
        tmy = (e.clientY / innerHeight) * 2 - 1;
      },
      { passive: true },
    );
  function loop() {
    if (current === "home" && heroVisible && !document.hidden) {
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      if (!reduce) {
        const y = scrollY;
        heroBg.style.transform = `translate3d(${(-mx * 14).toFixed(1)}px,${(y * 0.22 - my * 8).toFixed(1)}px,0) scale(1.08)`;
        heroTxt.style.transform = `translate3d(0,${(y * 0.2).toFixed(1)}px,0)`;
        heroTxt.style.opacity = Math.max(0, 1 - y / 620).toFixed(3);
      }
      if (motes.length) drawMotes();
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- Cursor, magnetic, spotlight, tilt (desktop only) ---------------- */
  if (fine && !reduce) {
    const c = $("#cursor"),
      d = $("#cursorDot");
    let cx = innerWidth / 2,
      cy = innerHeight / 2,
      rx = cx,
      ry = cy;
    addEventListener(
      "pointermove",
      (e) => {
        cx = e.clientX;
        cy = e.clientY;
        document.body.classList.add("has-cursor");
        d.style.transform = `translate(${cx}px,${cy}px)`;
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", () =>
      document.body.classList.remove("has-cursor"),
    );
    const follow = () => {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      c.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px)`;
      requestAnimationFrame(follow);
    };
    follow();
    document.addEventListener("pointerover", (e) => {
      c.classList.toggle(
        "big",
        !!e.target.closest(
          "a,button,[data-tilt],.sermon,.pcard,.opt,.prod,.g-item,input,select,textarea",
        ),
      );
    });
    document.addEventListener(
      "pointermove",
      (e) => {
        const m = e.target.closest(".magnetic");
        $$(".magnetic.pull").forEach((el) => {
          if (el !== m) {
            el.classList.remove("pull");
            el.style.transform = "";
          }
        });
        if (m) {
          const r = m.getBoundingClientRect();
          m.classList.add("pull");
          m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
        }
        const s = e.target.closest(".spot,.btn");
        if (s) {
          const r = s.getBoundingClientRect();
          s.style.setProperty("--x", e.clientX - r.left + "px");
          s.style.setProperty("--y", e.clientY - r.top + "px");
        }
        const t = e.target.closest("[data-tilt]");
        $$("[data-tilt].tilting").forEach((el) => {
          if (el !== t) {
            el.classList.remove("tilting");
            el.style.transform = "";
          }
        });
        if (t) {
          const r = t.getBoundingClientRect(),
            px = (e.clientX - r.left) / r.width - 0.5,
            py = (e.clientY - r.top) / r.height - 0.5;
          t.classList.add("tilting");
          t.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
        }
      },
      { passive: true },
    );
  }

  /* ---------------- Live status + countdown ---------------- */
  function watNow() {
    const n = new Date();
    return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 3600000);
  }
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const t12 = (h, m) =>
    `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
  function nextService() {
    const now = watNow();
    let best = null;
    for (let o = -1; o <= 7; o++)
      for (const s of schedule) {
        const d = new Date(now);
        d.setDate(now.getDate() + o);
        if (d.getDay() !== s.day) continue;
        d.setHours(s.h, s.m, 0, 0);
        const end = new Date(d.getTime() + s.dur * 60000);
        if (now >= d && now < end) return { live: true, s, start: d, now };
        if (d > now && (!best || d < best.start))
          best = { live: false, s, start: d, now };
      }
    return best;
  }
  function tickLive() {
    const n = nextService();
    if (!n) return;
    const diff = Math.max(0, n.start - n.now),
      u = {
        d: Math.floor(diff / 864e5),
        h: Math.floor(diff / 36e5) % 24,
        m: Math.floor(diff / 6e4) % 60,
        s: Math.floor(diff / 1e3) % 60,
      };
    $$("[data-countdown]").forEach((c) =>
      $$("[data-u]", c).forEach((b) => {
        const v = n.live ? "00" : pad(u[b.dataset.u]);
        if (b.textContent !== v) b.textContent = v;
      }),
    );
    const when = `${DAYS[n.s.day]} ${t12(n.s.h, n.s.m)} WAT`;
    $$("[data-status]").forEach((el) => el.classList.toggle("is-live", n.live));
    $$("[data-status-text]").forEach(
      (el) =>
        (el.textContent = n.live
          ? `Live now · ${n.s.name}`
          : `Next: ${n.s.name}`),
    );
    $$("[data-next-label]").forEach(
      (el) =>
        (el.textContent = n.live
          ? `${n.s.name} is on right now. Join us!`
          : `Counting down to ${n.s.name}, ${when}`),
    );
    const dl = [
      "Sundays",
      "Mondays",
      "Tuesdays",
      "Wednesdays",
      "Thursdays",
      "Fridays",
      "Saturdays",
    ];
    $$("[data-next-name]").forEach((el) => (el.textContent = n.s.name));
    const endT = new Date(n.start.getTime() + n.s.dur * 60000);
    $$("[data-next-when]").forEach(
      (el) =>
        (el.textContent = n.live
          ? "Happening now"
          : `${n.start.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" })}, ${t12(n.s.h, n.s.m).replace(" ", "")}–${t12(endT.getHours(), endT.getMinutes()).replace(" ", "")}`),
    );
    $$("[data-side-title]").forEach(
      (el) => (el.textContent = n.live ? "We are live" : "Next live service"),
    );
  }
  /* ---------------- Modal + toast ---------------- */
  const modal = $("#modal");
  function openModal(title, body, okText, onOk, closeText = "Close") {
    $("#mTitle").textContent = title;
    $("#mBody").innerHTML = body;
    $("#mOk").textContent = okText;
    $("#mClose").textContent = closeText;
    $("#mOk").onclick = () => {
      if (onOk?.() !== false) closeModal();
    };
    modal.classList.add("on");
    setTimeout(() => $("#mOk").focus(), 50);
  }
  function closeModal() {
    modal.classList.remove("on");
  }
  $("#mClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  const toastEl = $("#toast");
  function toast(t) {
    toastEl.textContent = t;
    toastEl.classList.add("on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("on"), 3400);
  }

  /* ---------------- Forms ---------------- */
  async function deliver(type, data) {
    if (!CONFIG.formEndpoint) return false;
    try {
      const r = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          form: type,
          submittedAt: new Date().toISOString(),
          ...data,
        }),
      });
      return r.ok;
    } catch (e) {
      return false;
    }
  }
  function validate(form) {
    let first = null;
    $$("[required]", form).forEach((i) => {
      const v = i.type === "checkbox" ? i.checked : i.value.trim();
      const bad = !v;
      i.closest(".fld")?.classList.toggle("bad", bad);
      if (bad && !first) first = i;
    });
    $$("input[type=email]", form).forEach((i) => {
      if (i.value && !/^\S+@\S+\.\S+$/.test(i.value)) {
        i.closest(".fld").classList.add("bad");
        first = first || i;
      }
    });
    if (first) first.focus();
    return !first;
  }
  function formData(form) {
    const o = {};
    for (const [k, v] of new FormData(form))
      o[k] = o[k] ? [].concat(o[k], v) : v;
    if (o.countryCode && o.phone) {
      o.phone = `${o.countryCode} ${o.phone}`;
      delete o.countryCode;
    }
    return o;
  }
  document.addEventListener("input", (e) => {
    const f = e.target.closest(".fld");
    if (f) f.classList.remove("bad");
  });
  document.addEventListener("change", (e) => {
    const f = e.target.closest(".fld");
    if (f) f.classList.remove("bad");
  });
  $$("form[data-form]").forEach((form) =>
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const btn = $("button[type=submit]", form),
        ok = $(".ok", form);
      btn.disabled = true;
      btn.classList.add("busy");
      const sent = await deliver(form.dataset.form, formData(form));
      btn.disabled = false;
      btn.classList.remove("busy");
      if (sent) {
        form.innerHTML = `<div class="done"><span class="opt-ic"><svg class="ico"><use href="#i-check"/></svg></span><h3>${esc(form.dataset.okTitle || "Thank you!")}</h3><p>${esc(form.dataset.okText || "Your details have been received.")}</p></div>`;
        form.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
      } else {
        ok.classList.add("on", "warn");
        ok.textContent =
          "Online forms are not connected yet, so these details were not sent. Please speak to us at any service at #4 Hospital Road, UBA Building (Top Floor), Port Harcourt.";
      }
    }),
  );
  $("#nlForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const i = $("#nlEmail");
    if (!/^\S+@\S+\.\S+$/.test(i.value)) {
      toast("Please enter a valid email");
      i.focus();
      return;
    }
    const ok = await deliver("newsletter", { email: i.value });
    toast(
      ok
        ? "You're subscribed. God bless you!"
        : "Email updates are coming soon. Thank you!",
    );
    if (ok) i.value = "";
  });

  /* ---------------- Give ---------------- */
  const AMTS = [2000, 5000, 10000, 20000, 50000, 100000];
  const amtsEl = $("#amts"),
    gAmt = $("#gAmt"),
    gFund = $("#gFund"),
    payEl = $("#pay");
  amtsEl.innerHTML = AMTS.map(
    (a) =>
      `<button type="button" class="amt" aria-pressed="${a === 10000}" data-a="${a}">${naira(a)}</button>`,
  ).join("");
  const amount = () => +gAmt.value.replace(/\D/g, "") || 0;
  const payMethod = () => $("[aria-pressed=true]", payEl).dataset.v;
  function updateSummary() {
    $("#sumAmt").textContent = naira(amount());
    $("#sumLabel").textContent = `${gFund.value} · ${payMethod()}`;
    $$(".amt", amtsEl).forEach((b) =>
      b.setAttribute("aria-pressed", +b.dataset.a === amount()),
    );
    $$(".gcat").forEach((b) =>
      b.classList.toggle("on", b.dataset.gcat === gFund.value),
    );
  }
  amtsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".amt");
    if (!b) return;
    gAmt.value = (+b.dataset.a).toLocaleString("en-NG");
    gAmt.closest(".fld").classList.remove("bad");
    updateSummary();
  });
  gAmt.addEventListener("input", () => {
    const v = amount();
    gAmt.value = v ? v.toLocaleString("en-NG") : "";
    updateSummary();
  });
  gFund.addEventListener("change", updateSummary);
  payEl.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("button", payEl).forEach((x) => x.setAttribute("aria-pressed", x === b));
    updateSummary();
  });
  $("#gcats").addEventListener("click", (e) => {
    const b = e.target.closest(".gcat");
    if (!b) return;
    gFund.value = b.dataset.gcat;
    setTab($("[data-tabs=give]"), "online");
    updateSummary();
    $("#giveForm").scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  });
  updateSummary();
  $("#giveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const amtOk = amount() >= 100;
    gAmt.closest(".fld").classList.toggle("bad", !amtOk);
    if (!amtOk) {
      gAmt.focus();
      return;
    }
    if (!validate(e.target)) return;
    if (payMethod() === "Bank Transfer") {
      setTab($("[data-tabs=give]"), "bank");
      $("#bankCard").scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
      return;
    }
    const rows = `<ul class="list"><li>Category<b>${esc(gFund.value)}</b></li><li>Amount<b>${naira(amount())}</b></li><li>Method<b>Online payment</b></li></ul>`;
    if (CONFIG.paystackKey)
      openModal(
        "Continue to give",
        rows +
          '<p class="note">You will be taken to our secure payment page.</p>',
        "Pay securely",
        () => toast("Opening secure payment…"),
      );
    else
      openModal(
        "Continue to give",
        rows +
          '<p class="note">Online payment is being set up. Please use bank transfer or give during service for now. Thank you for your generosity.</p>',
        "Use bank transfer",
        () => setTab($("[data-tabs=give]"), "bank"),
      );
  });
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    if (!b.dataset.copy) {
      toast("The account number will be added here once verified.");
      return;
    }
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      toast("Account number copied");
    } catch (err) {
      toast("Copy not available here. Number: " + b.dataset.copy);
    }
  });

  /* ---------------- Shop cart ---------------- */
  let cart = store.get("mtm-cart", {});
  const cartEl = $("#cart"),
    scrim = $("#scrim");
  const byId = (id) => products.find((p) => p.id === id);
  function saveCart() {
    store.set("mtm-cart", cart);
    renderCart();
  }
  function renderCart() {
    const ids = Object.keys(cart).filter(byId),
      count = ids.reduce((a, id) => a + cart[id], 0),
      total = ids.reduce((a, id) => a + cart[id] * byId(id).price, 0);
    $$("[data-cart-n], #cartN").forEach((n) => {
      n.textContent = count;
      n.classList.toggle("has", count > 0);
    });
    $("#cartTotal").textContent = naira(total);
    $("#checkoutBtn").disabled = !count;
    $("#cartItems").innerHTML = count
      ? ids
          .map((id) => {
            const p = byId(id);
            return `<div class="ci-row"><div class="ci-im">${productArt(p.kind)}</div><div class="ci-b"><b>${p.name}</b><small>${naira(p.price)} · ${p.stock}</small>
    <div class="qty" data-cqty="${id}"><button type="button" data-d="-1" aria-label="Decrease">−</button><span>${cart[id]}</span><button type="button" data-d="1" aria-label="Increase">+</button></div></div><button class="rm" data-rm="${id}" aria-label="Remove ${p.name}"><svg class="ico"><use href="#i-x"/></svg></button></div>`;
          })
          .join("")
      : '<div class="empty">Your cart is empty.</div>';
  }
  function openCart() {
    cartEl.classList.add("on");
    scrim.classList.add("on");
    cartEl.setAttribute("aria-hidden", "false");
    setTimeout(() => $("#cartClose").focus(), 50);
  }
  function closeCart() {
    cartEl.classList.remove("on");
    scrim.classList.remove("on");
    cartEl.setAttribute("aria-hidden", "true");
  }
  $("#cartOpen").addEventListener("click", openCart);
  $("#hdrCart").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);
  document.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty] button");
    if (q) {
      const id = q.parentElement.dataset.qty;
      qty[id] = Math.max(1, Math.min(20, (qty[id] || 1) + +q.dataset.d));
      $("span", q.parentElement).textContent = qty[id];
      return;
    }
    const cq = e.target.closest("[data-cqty] button");
    if (cq) {
      const id = cq.parentElement.dataset.cqty;
      cart[id] = Math.max(0, (cart[id] || 0) + +cq.dataset.d);
      if (!cart[id]) delete cart[id];
      saveCart();
      return;
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) {
      delete cart[rm.dataset.rm];
      saveCart();
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      const id = add.dataset.add;
      cart[id] = (cart[id] || 0) + (qty[id] || 1);
      saveCart();
      toast(`${byId(id).name} added to cart`);
      add.animate?.([{ transform: "scale(.92)" }, { transform: "scale(1)" }], {
        duration: 300,
      });
      return;
    }
    const buy = e.target.closest("[data-buy]");
    if (buy) {
      const id = buy.dataset.buy;
      cart[id] = (cart[id] || 0) + (qty[id] || 1);
      saveCart();
      checkout();
      return;
    }
    const sc = e.target.closest("[data-scat]");
    if (sc) {
      setTab(shopTabs, sc.dataset.scat);
      $("#prods").scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  });
  function checkout() {
    closeCart();
    const ids = Object.keys(cart).filter(byId);
    if (!ids.length) return;
    const total = ids.reduce((a, id) => a + cart[id] * byId(id).price, 0);
    const lines = ids
      .map(
        (id) =>
          `<li>${byId(id).name} × ${cart[id]}<b>${naira(cart[id] * byId(id).price)}</b></li>`,
      )
      .join("");
    const body = `<ul class="list">${lines}<li>Total<b>${naira(total)}</b></li></ul>
    <form id="coForm" class="co" novalidate><div class="fld"><label for="coName">Full name *</label><input id="coName" required autocomplete="name"><span class="err">Please enter your name</span></div>
    <div class="fld"><label for="coPhone">Phone number *</label><input id="coPhone" type="tel" required autocomplete="tel" placeholder="+234"><span class="err">Please enter your phone number</span></div>
    <div class="fld"><label for="coAddr">Delivery address (leave empty to pick up at church)</label><input id="coAddr" autocomplete="street-address"></div></form>`;
    openModal(
      "Checkout",
      body,
      CONFIG.paystackKey
        ? "Pay securely"
        : CONFIG.whatsappOrders
          ? "Send order on WhatsApp"
          : "Place order request",
      () => {
        const f = $("#coForm");
        if (!validate(f)) return false;
        const text = `Order from website%0A${ids.map((id) => `${byId(id).name} x${cart[id]}`).join("%0A")}%0ATotal: ${naira(total)}%0AName: ${encodeURIComponent($("#coName").value)}%0APhone: ${encodeURIComponent($("#coPhone").value)}%0ADelivery: ${encodeURIComponent($("#coAddr").value || "Pick up at church")}`;
        if (CONFIG.paystackKey) {
          toast("Opening secure payment…");
          return;
        }
        if (CONFIG.whatsappOrders) {
          const a = document.createElement("a");
          a.href = `https://wa.me/${CONFIG.whatsappOrders}?text=${text}`;
          a.rel = "noopener";
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          a.remove();
          return;
        }
        deliver("shop-order", {
          items: ids.map((id) => ({ product: byId(id).name, qty: cart[id] })),
          total,
          name: $("#coName").value,
          phone: $("#coPhone").value,
          address: $("#coAddr").value,
        }).then((ok) =>
          toast(
            ok
              ? "Order request sent. We will contact you to confirm."
              : "Online checkout is being set up. Please ask about this order at church.",
          ),
        );
      },
      "Keep shopping",
    );
  }
  $("#checkoutBtn").addEventListener("click", checkout);
  renderCart();

  /* ---------------- Lightbox ---------------- */
  const lb = $("#lightbox");
  let lbi = 0;
  function showLb(i) {
    lbi = (i + gallery.length) % gallery.length;
    const [n, cap] = gallery[lbi];
    $("#lbImg").src = IMG(n);
    $("#lbImg").alt = cap;
    $("#lbCap").textContent = `${cap} · ${lbi + 1} / ${gallery.length}`;
  }
  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-g]");
    if (!g) return;
    showLb(+g.dataset.g);
    lb.classList.add("on");
    $("#lbClose").focus();
  });
  $("#lbClose").addEventListener("click", () => lb.classList.remove("on"));
  $("#lbPrev").addEventListener("click", () => showLb(lbi - 1));
  $("#lbNext").addEventListener("click", () => showLb(lbi + 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) lb.classList.remove("on");
  });
  {
    let sx = null;
    lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), {
      passive: true,
    });
    lb.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) showLb(lbi + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }
  addEventListener("keydown", (e) => {
    if (lb.classList.contains("on")) {
      if (e.key === "ArrowRight") showLb(lbi + 1);
      if (e.key === "ArrowLeft") showLb(lbi - 1);
      if (e.key === "Escape") lb.classList.remove("on");
      return;
    }
    if (e.key === "Escape") {
      closeModal();
      closeMenu();
      closeCart();
    }
  });

  /* ---------------- Boot ---------------- */
  $("#yr").textContent = new Date().getFullYear();
  observeReveal();
  setPage(resolve(location.hash.slice(1)));
  sizeMotes();
  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      sizeMotes();
      refreshInks();
      sizeHS();
      onScroll();
    }, 150);
  });
  sizeHS();
  document.fonts?.ready.then(() => {
    sizeHS();
    onScroll();
  });
  tickLive();
  setInterval(() => {
    if (!document.hidden) tickLive();
  }, 1000);
  requestAnimationFrame(loop);
  const loader = $("#loader");
  const finish = () => {
    loader.classList.add("done");
    setTimeout(() => root.classList.add("ready"), 120);
  };
  if (document.readyState === "complete") setTimeout(finish, 300);
  else addEventListener("load", () => setTimeout(finish, 200));
  setTimeout(finish, 1800);
}
