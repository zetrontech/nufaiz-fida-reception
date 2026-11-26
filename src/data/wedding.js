// All invitation content lives here (Wedding Reception card for Fida & Nufaiz).
export const MAPS_URL = 'https://share.google/p2bq3AAJziA3Y17Au'

const venue = {
  name: 'Mount Ridge International Convention Centre',
  city: 'Manjeri',
  address: 'Manjeri, Kerala',
  mapsUrl: MAPS_URL,
}

export const wedding = {
  couple: {
    bride: {
      informal: 'Fida',
      formal: 'Fida Itheeru N',
      qualification: '',
      family: {
        parents: [],
        grandparents: [
          'Granddaughter of the late Mr Abdul Kareem N & P.A. Kunchipathumma',
          'and of the late Dr Umar Karuvathodi & Mrs Fathimabi',
        ],
        place: '',
      },
    },
    groom: {
      informal: 'Nufaiz',
      formal: 'Nufaiz Ali Fazal',
      qualification: '',
      family: {
        parents: ['S/o Dr Fazal Mohammed V.C & Mrs Mariyam Minnath V.T'],
        grandparents: [],
        place: '',
      },
    },
  },
  openerNames: ['Fida', 'Nufaiz'],
  initials: { bride: 'F', groom: 'N' },
  dates: { year: 2026, monthIndex: 11, month: 'December', weddingStart: '2026-12-27T12:30:00+05:30' },
  venue,
  // The one event on this card: the wedding reception.
  wedding: {
    title: 'Wedding Reception',
    date: '2026-12-27',
    start: '2026-12-27T12:30:00+05:30',
    end: '2026-12-27T15:00:00+05:30',
    day: 27,
    weekday: 'Sunday',
    venue,
    schedule: [{ time: '12:30 PM – 3:00 PM', title: 'Wedding Reception' }],
  },
  hosts: 'Dr Asiq Sideeque Nalakath, Dr Ruxana K, Avez & Aazim',
  // Wording supplied by the client.
  prayer: ['In the name of Allah', 'The Most Gracious, The Most Merciful'],
  // First entry is kept on one line (client request).
  invitation: ['Dr. Asiq Sideeque Nalakath, Dr. Ruxana K,', 'Avez and Aazim invites you to the Wedding Reception of'],
  theme: 'Two hearts, one promise, a lifetime together.',
  verse: 'May Allah bless you both, shower His blessings upon you, and unite you in goodness.',
  verseArabic: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  verseReference: 'A PRAYER FOR TWO',
}

export const shareTitle = 'Fida & Nufaiz | Wedding Reception'
