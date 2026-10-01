// full chalisa text: 2 opening dohas, 40 chaupais, closing doha, then
// the outro mantra this recording chants after the chalisa ends.
//
// `start` (seconds) is hand-timed against the video's auto captions.
// `end` is just the next verse's start, so if you swap videos you only
// need to retime the `start` column below, everything else recomputes.

const RAW_VERSES = [
  { type: "doha", start: 0, text: "श्रीगुरु चरन सरोज रज,\nनिज मनु मुकुरु सुधारि।" },
  { type: "doha", start: 6, text: "बरनऊँ रघुबर बिमल जसु,\nजो दायकु फल चारि॥" },
  { type: "doha", start: 11, text: "बुद्धिहीन तनु जानिके,\nसुमिरौं पवन-कुमार।" },
  { type: "doha", start: 16, text: "बल बुधि बिद्या देहु मोहिं,\nहरहु कलेश बिकार॥" },

  { type: "chaupai", start: 21, text: "जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुं लोक उजागर॥" },
  { type: "chaupai", start: 26, text: "राम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा॥" },
  { type: "chaupai", start: 31, text: "महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥" },
  { type: "chaupai", start: 35, text: "कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा॥" },
  { type: "chaupai", start: 40, text: "हाथ बज्र औ ध्वजा बिराजै।\nकांधे मूंज जनेऊ साजै॥" },
  { type: "chaupai", start: 45, text: "संकर सुवन केसरीनंदन।\nतेज प्रताप महा जग बंदन॥" },
  { type: "chaupai", start: 51, text: "बिद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर॥" },
  { type: "chaupai", start: 59, text: "प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया॥" },
  { type: "chaupai", start: 63, text: "सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा॥" },
  { type: "chaupai", start: 67, text: "भीम रूप धरि असुर संहारे।\nरामचंद्र के काज संवारे॥" },
  { type: "chaupai", start: 73, text: "लाय सजीवन लखन जियाये।\nश्रीरघुबीर हरषि उर लाये॥" },
  { type: "chaupai", start: 77, text: "रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई॥" },
  { type: "chaupai", start: 82, text: "सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं॥" },
  { type: "chaupai", start: 87, text: "सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा॥" },
  { type: "chaupai", start: 93, text: "जम कुबेर दिगपाल जहां ते।\nकबि कोबिद कहि सके कहां ते॥" },
  { type: "chaupai", start: 99, text: "तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा॥" },
  { type: "chaupai", start: 102, text: "तुम्हरो मंत्र बिभीषन माना।\nलंकेस्वर भए सब जग जाना॥" },
  { type: "chaupai", start: 107, text: "जुग सहस्र जोजन पर भानू।\nलील्यो ताहि मधुर फल जानू॥" },
  { type: "chaupai", start: 112, text: "प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लांघि गये अचरज नाहीं॥" },
  { type: "chaupai", start: 119, text: "दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते॥" },
  { type: "chaupai", start: 124, text: "राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे॥" },
  { type: "chaupai", start: 127, text: "सब सुख लहै तुम्हारी सरना।\nतुम रच्छक काहू को डर ना॥" },
  { type: "chaupai", start: 133, text: "आपन तेज सम्हारो आपे।\nतीनों लोक हांक तें कांपे॥" },
  { type: "chaupai", start: 137, text: "भूत पिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै॥" },
  { type: "chaupai", start: 143, text: "नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा॥" },
  { type: "chaupai", start: 147, text: "संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै॥" },
  { type: "chaupai", start: 153, text: "सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा॥" },
  { type: "chaupai", start: 157, text: "और मनोरथ जो कोई लावै।\nसोइ अमित जीवन फल पावै॥" },
  { type: "chaupai", start: 164, text: "चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा॥" },
  { type: "chaupai", start: 169, text: "साधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे॥" },
  { type: "chaupai", start: 173, text: "अष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता॥" },
  { type: "chaupai", start: 178, text: "राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा॥" },
  { type: "chaupai", start: 183, text: "तुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै॥" },
  { type: "chaupai", start: 188, text: "अंतकाल रघुबर पुर जाई।\nजहां जन्म हरि-भक्त कहाई॥" },
  { type: "chaupai", start: 191, text: "और देवता चित्त न धरई।\nहनुमत सेइ सर्ब सुख करई॥" },
  { type: "chaupai", start: 199, text: "संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा॥" },
  { type: "chaupai", start: 205, text: "जै जै जै हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं॥" },
  { type: "chaupai", start: 208, text: "जो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई॥" },
  { type: "chaupai", start: 214, text: "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा॥" },
  { type: "chaupai", start: 218, text: "तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय मंह डेरा॥" },

  { type: "doha", start: 224, text: "पवनतनय संकट हरन,\nमंगल मूरति रूप।" },
  { type: "doha", start: 228, text: "राम लखन सीता सहित,\nहृदय बसहु सुर भूप॥" },

  // outro mantra, only in this recording
  { type: "mantra", start: 233, text: "श्री राम जय राम,\nजय जय राम॥" },
  { type: "mantra", start: 240, text: "श्री राम जय राम,\nजय जय राम॥" },
  { type: "mantra", start: 247, text: "श्री राम जय राम,\nजय जय राम॥" },
];

const FINAL_END_SECONDS = 258; // instrumental fade-out begins here

let chaupaiCount = 0;

export const hanumanChalisaLyrics = RAW_VERSES.map((verse, index) => {
  if (verse.type === "chaupai") chaupaiCount += 1;
  const next = RAW_VERSES[index + 1];
  return {
    id: index + 1,
    type: verse.type,
    number: verse.type === "chaupai" ? chaupaiCount : null,
    start: verse.start,
    end: next ? next.start : FINAL_END_SECONDS,
    text: verse.text,
  };
});

export const CHALISA_TOTAL_DURATION =
  hanumanChalisaLyrics[hanumanChalisaLyrics.length - 1].end;
