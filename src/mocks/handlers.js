import { rest } from "msw";
import { googleURL } from "../components/API/constants";
const fakeChannelInfo = [
  {
    id: {
      kind: "youtube#channel",
      channelId: "UCtby6rJtBGgUm-2oD_E7bzw"
    },
    snippet: {
      title: "RTGame",
      description: "Hi I'm an Irish Guy named Daniel.",
      publishedAt: "2011-08-13T18:42:18Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88
        },
        medium: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240
        },
        high: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800
        }
      },
      defaultLanguage: "en-GB",
      localized: {
        title: "RTGame",
        description: "Hi I'm an Irish Guy named Daniel."
      },
      country: "IE"
    },
    contentDetails: {
      relatedPlaylists: {
        likes: "",
        favorites: "",
        uploads: "UURC6cNamj9tYAO6h_RXd5xA"
      }
    },
    statistics: {
      viewCount: "859441197",
      subscriberCount: "2640000",
      hiddenSubscriberCount: false,
      videoCount: "669"
    },
    topicDetails: {
      topicIds: [
        "/m/02ntfj",
        "/m/025zzc",
        "/m/03hf_rm",
        "/m/0bzvm2",
        "/m/0403l3g"
      ],
      topicCategories: [
        "https://en.wikipedia.org/wiki/Action-adventure_game",
        "https://en.wikipedia.org/wiki/Action_game",
        "https://en.wikipedia.org/wiki/Strategy_video_game",
        "https://en.wikipedia.org/wiki/Video_game_culture",
        "https://en.wikipedia.org/wiki/Role-playing_video_game"
      ]
    },
    status: {
      privacyStatus: "public",
      isLinked: true,
      longUploadsStatus: "longUploadsUnspecified",
      madeForKids: false
    },
    brandingSettings: {
      image: {
        bannerExternalUrl:
          "https://yt3.ggpht.com/fEDt59r4-jh4ODapCg0TCoiajOfzGOXoZm2n6_2kQhV6ujt2t8PsoLZGTGtGxsPSoEIQ8SvSR40"
      }
    },
    contentOwnerDetails: {},
    localizations: {
      en_GB: {
        title: "RTGame",
        description: "Hi I'm an Irish Guy named Daniel. "
      }
    }
  },
  {
    id: {
      kind: "youtube#channel",
      channelId: "UCtby6rJtBGgUm-2oD_E7999"
    },
    snippet: {
      title: "RTGame2",
      description: "Hi I'm an Irish Guy named Daniel.",
      publishedAt: "2011-08-13T18:42:18Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88
        },
        medium: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240
        },
        high: {
          url: "https://yt3.ggpht.com/lkuVbQ5BgmoWWQvZMS7wv_-ZZ-mIadKZDIEj5PdtAseERS6xPzmUSk9aFR66iTBs1r7gghLpzA=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800
        }
      },
      defaultLanguage: "en-GB",
      localized: {
        title: "RTGame",
        description: "Hi I'm an Irish Guy named Daniel. "
      },
      country: "IE"
    },
    contentDetails: {
      relatedPlaylists: {
        likes: "",
        favorites: "",
        uploads: "UURC6cNamj9tYAO6h_RXd5xA"
      }
    },
    statistics: {
      viewCount: "859441197",
      subscriberCount: "2640000",
      hiddenSubscriberCount: false,
      videoCount: "669"
    },
    topicDetails: {
      topicIds: [
        "/m/02ntfj",
        "/m/025zzc",
        "/m/03hf_rm",
        "/m/0bzvm2",
        "/m/0403l3g"
      ],
      topicCategories: [
        "https://en.wikipedia.org/wiki/Action-adventure_game",
        "https://en.wikipedia.org/wiki/Action_game",
        "https://en.wikipedia.org/wiki/Strategy_video_game",
        "https://en.wikipedia.org/wiki/Video_game_culture",
        "https://en.wikipedia.org/wiki/Role-playing_video_game"
      ]
    },
    status: {
      privacyStatus: "public",
      isLinked: true,
      longUploadsStatus: "longUploadsUnspecified",
      madeForKids: false
    },
    brandingSettings: {
      image: {
        bannerExternalUrl:
          "https://yt3.ggpht.com/fEDt59r4-jh4ODapCg0TCoiajOfzGOXoZm2n6_2kQhV6ujt2t8PsoLZGTGtGxsPSoEIQ8SvSR40"
      }
    },
    contentOwnerDetails: {},
    localizations: {
      en_GB: {
        title: "RTGame",
        description: "Hi I'm an Irish Guy named Daniel. "
      }
    }
  }
];

export const handlers = [
  //fetchYoutubeChannelsByKeyword
  rest.get(googleURL.youtubeSearch, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ items: fakeChannelInfo }));
  }),

  // fetchYoutubeChannelInfo
  rest.get(googleURL.youtubeChannelSearch, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ items: fakeChannelInfo }));
  })
];
