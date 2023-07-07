export type movieDataType = {
  _id: string

  title: string
  color: string
  color2: string
  img: string
  video: string
  description: string
  actors: {
    name: string
    img: string
  }[]
  rating: {
    IMDb: number
    RottenTomatos: number
  }
  quote: string
  metadata: {
    hr: string
    year: string
    genre: string[]
  }
}

export const filmData: movieDataType[] = [
  {
    id: 1,
    quote:
      'Look at that subtle off-white coloring. The tasteful thickness of it. Oh, my God. It even has a watermark',
    title: 'American Psycho',
    color: `rgba(255, 255, 255, 0.7)`,
    color2: `#710f10`,
    img: ` https://e0.pxfuel.com/wallpapers/361/514/desktop-wallpaper-american-psycho-poster-horor-movie-wall-decor-wall-print-american-psycho-home-decor-gift-for-him-gift-for-her-handmade-products-patrick-bateman.jpg`,
    video: `https://www.youtube.com/embed/x19FimfBfOo`,
    description: `A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.

    It's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.`,
    actors: [
      {
        name: 'Christian Bale',
        img:
          'https://e0.pxfuel.com/wallpapers/939/2/desktop-wallpaper-view-christian-bale-american-psycho-patrick-bateman.jpg',
      },
      {
        name: `Jared Leto`,
        img: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Jared_Leto%2C_San_Diego_Comic_Con_2016_%282%29_%28cropped%29.jpg/800px-Jared_Leto%2C_San_Diego_Comic_Con_2016_%282%29_%28cropped%29.jpg`,
      },
      {
        name: `Willem Dafoe`,
        img: `https://upload.wikimedia.org/wikipedia/commons/1/14/Willem_Dafoe_Cannes_2019.jpg`,
      },
    ],
    rating: {
      IMDb: 7.6,
      RottenTomatos: 68,
    },
    metadata: {
      hr: `1h 42m`,
      year: `2000`,
      genre: [`Thriller`, `Satire`],
    },
  },
  {
    id: 2,
    quote: `You Are the Same Decaying Organic Matter as Everything Else.`,
    title: 'Fight Club',
    color: `rgba(14, 45, 47, 0.64)`,
    color2: `#ff39b7`,

    img: `https://firebasestorage.googleapis.com/v0/b/pcmarket-8f5e8.appspot.com/o/sigmamovies%2FFIGHT-CLUB-HarryMovieArt_1024x1024.webp?alt=media&token=ae0f87cd-c639-4db4-b104-d4d1da948d39`,
    video: `https://www.youtube.com/embed/jBT4_Cx5ihs`,
    description: ` An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.
    A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power.`,
    actors: [
      {
        name: 'Edward Norton',
        img: 'https://m.media-amazon.com/images/I/61CtO7YkiwL._AC_SX425_.jpg',
      },
      {
        name: `Brad Pitt`,
        img: `https://i.pinimg.com/originals/06/ce/ac/06ceacba8d75c9e37c15c9ab0cb766e7.jpg`,
      },
      {
        name: `Helena Bonham `,
        img: `https://cdn.britannica.com/10/237510-050-0D3B1ECE/British-actress-Helena-Bonham-Carter-2019.jpg`,
      },
    ],
    rating: {
      IMDb: 8.8,
      RottenTomatos: 79,
    },
    metadata: {
      hr: `2h 19m`,
      year: `1999`,
      genre: [`Action`, `Thriller`],
    },
  },
  {
    id: 3,
    quote: `if you want to win the lottery, you have to make the money to buy the ticket`,
    title: 'Nightcrawler',
    color: `rgba(36, 36, 36, 0.66)`,
    color2: `#ec2b58`,
    img: `https://firebasestorage.googleapis.com/v0/b/pcmarket-8f5e8.appspot.com/o/sigmamovies%2Fmattryan_nightcrawler.jpg?alt=media&token=f7ffb52e-910e-4501-aa3f-3d3d24823c63`,
    video: `https://www.youtube.com/embed/kKaR6AqoYqk`,
    description: `NIGHTCRAWLER is a thriller set in the nocturnal underbelly of contemporary Los Angeles. Jake Gyllenhaal stars as Lou Bloom, a driven young man desperate for work who discovers the high-speed world of L.A. crime journalism. Finding a group of freelance camera crews who film crashes, fires, murder and other mayhem, Lou muscles into the cut-throat, dangerous realm of nightcrawling - where each police siren wail equals a possible windfall and victims are converted into dollars and cents. Aided by Rene Russo as Nina, a veteran of the blood-sport that is local TV news, Lou blurs the line between observer and participant to become the star of his own story`,
    actors: [
      {
        name: 'Jake Gyllenhaal',
        img:
          'https://images.mubicdn.net/images/cast_member/3071/cache-3195-1568084972/image-w856.jpg?size=800x',
      },
      {
        name: `Rene Russo`,
        img: `https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTGjrlRH7eSeBPR0WqpgATo78sGdALSayVHPr3q8UkuDe_IfNdtRUCEfBrOPYqvD9OUDtKehSV9Vkq6X9k`,
      },
      {
        name: `Riz Ahmed`,
        img: `https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQcO4ab1Tlo9ttiLGdhMNCrzaWtdGYJ2MM_7ERXIDimGKFBK6ZLQ1_cwjSZVucowMUl9aOWUjxHkKrstOQ`,
      },
    ],
    rating: {
      IMDb: 7.8,
      RottenTomatos: 95,
    },
    metadata: {
      hr: `1h 57m`,
      year: `2014`,
      genre: [`Thriller`, `Crime`],
    },
  },
  {
    id: 4,
    quote: `You tell me where we start, where we're going, where we're going afterwards. I give you five minutes when we get there. Anything happens in that five minutes and I'm yours. No matter what`,
    title: 'Drive',
    color: `rgba(24, 14, 42, 0.71)`,
    color2: `#cf1b4e`,
    img: `https://firebasestorage.googleapis.com/v0/b/pcmarket-8f5e8.appspot.com/o/sigmamovies%2Fsignalnoise_drive.jpg?alt=media&token=df7e14de-61fd-4824-91eb-d9a6e1dc05d1`,
    video: `https://www.youtube.com/embed/kKaR6AqoYqk`,
    description: `This action drama follows a mysterious man who has multiple jobs as a garage mechanic, a Hollywood stuntman and a getaway driver seems to be trying to escape his shady past as he falls for his neighbor - whose husband is in prison and who's looking after her child alone. Meanwhile, his garage mechanic boss is trying to set up a race team using gangland money, which implicates our driver as he is to be used as the race team's main driver. Our hero gets more than he bargained for when he meets the man who is married to the woman he loves`,
    actors: [
      {
        name: 'Ryan Gosling',
        img:
          'https://s.yimg.com/ny/api/res/1.2/EChXLkRnuoYtja8B88_E3g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTQyMDtoPTU1MA--/https://media.zenfs.com/en-AU/homerun/y7.newidea/d0048687d4851f23d33076fa8fb1f83b',
      },
      {
        name: `Carey Mulligan`,
        img: `https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSqahph7hGZInR6TIR4MOaxkSOALxh_JCAgvtww5T0253DerbYqXpxZdvnuyqKfQ3Qs32J6EOP59U0fB4s`,
      },
      {
        name: `Bryan Cranston`,
        img: `https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRTJmZSP1xT23YJesXxqvx9-F0emf6NrtkFeESkEXgUTWEELzuaTkm5HYtJt2c-sF-eFdCnHpNBwIc7fVU`,
      },
    ],
    rating: {
      IMDb: 7.8,
      RottenTomatos: 93,
    },
    metadata: {
      hr: `1h 40m`,
      year: `2011`,
      genre: [`Action`, `Drama`],
    },
  },
  {
    id: 5,
    quote: `Every leap of civilization was built on the back of a disposable workforce, but I can only make so many`,
    title: 'Blade Runner 2049 ',
    color: `rgba(2, 4, 44, 0.7)`,
    color2: `#cc0319`,
    img: `https://i0.wp.com/artofvfx.com/wp-content/uploads/2017/08/blade_runner_twenty_forty_nine_ver5_xlg.jpg`,
    video: `https://www.youtube.com/embed/O0BHvF45KOA`,
    description: `The story opens in 2049, thirty years after the events of the first film. An on-screen text states that the Tyrell Corporation has collapsed decades before, in the wake of violent revolts involving their Nexus-6 through -8 Replicants, forcing the company into bankruptcy. After the world's ecosystems collapsed in the mid 2020s, famine swept the Earth, killing millions. With his invention of synthetic farming, a wealthy businessman named Niander Wallace (Jared Leto) ended food shortages and acquired Tyrell's remaining assets to form his own corporation. The Wallace Company has reinvigorated the Replicant industry by mass producing the Nexus-9 Replicants, a new generation of artificial humans with modified behavior to make them more obedient than the older models. These Replicants have implanted memories and open-ended lifespans, and are still used for slave labor on the off-world colonies (the Moon, Mars, and the moons of Jupiter, Saturn, etc.), but some are also used as Blade Runner units, hunting down and "retiring" the few remaining older model Replicants that are still at large.`,
    actors: [
      {
        name: ' ',
        img: '  ',
      },
      {
        name: ` `,
        img: ` `,
      },
      {
        name: ` `,
        img: ` `,
      },
    ],
    rating: {
      IMDb: 8.1,
      RottenTomatos: 89,
    },
    metadata: {
      hr: `2h 43m`,
      year: `2017`,
      genre: [`Sci-fi`, `Action`],
    },
  },
]

// {
//   quote: ` `,
//   title: ' ',
//   color: ` `,
//   color2: ` `,
//   img: `  `,
//   video: ` `,
//   dec: ` `,
//   actors: [
//     {
//       name: ' ',
//       img:
//         '  ',
//     },
//     {
//       name: ` `,
//       img: ` `,
//     },
//     {
//       name: ` `,
//       img: ` `,
//     },
//   ],
//   rating: {
//     IMDb:  ,
//     RottenTomatos:  ,
//   },
//   metadata: {
//     hr: ` `,
//     year: ` `,
//     genre: [` `, ` `],
//   },
// },

export const topMovieGenres = [
  'All',
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'War',
  'Western',
  'Biography',
  'Sport',
  'Musical',
  'Superhero',
  'Noir',
  'Supernatural',
  'Spy',
  'Teen',
  'Coming of Age',
  'Fantasy Adventure',
  'Post-Apocalyptic',
  'Zombie',
  'Time Travel',
  'Cyberpunk',
  'Gangster',
  'Period Drama',
  'Courtroom Drama',
  'Psychological Thriller',
  'Found Footage',
  'Slasher',
  'Satire',
  'Animation Comedy',
  'Parody',
  'War Drama',
  'Political',
  'Alien Invasion',
  'Monster',
  'Vampire',
  'Werewolf',
  'Robot',
  'Serial Killer',
  'Romantic Comedy',
]

/// test data
const jsnObj = {
  id: 0,
  title: 'The Dark Knight',
  color: 'Black',
  color2: 'White',
  img: 'https://www.example.com/the-dark-knight.jpg',
  video: 'https://www.example.com/the-dark-knight.mp4',
  description:
    'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  rating: {
    IMDb: 9,
    RottenTomatos: 94,
  },
  actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  metadata: {
    hr: '2h 32m',
    year: 2008,
    genre: 'Action',
  },
}

//  jsno
// {
//   "id": 4,
//   "title": "The Dark Knight",
//   "color": "Black",
//   "color2": "White",
//   "img": "https://www.example.com/the-dark-knight.jpg",
//   "video": "https://www.example.com/the-dark-knight.mp4",
//   "description":
//     "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//   "rating": {
//     "IMDb": 9,
//     "RottenTomatos": 94
//   },
//   "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
//   "metadata": {
//     "hr": "2h 32m",
//     "year": "2008",
//     "genre": "Action",
//   }}
