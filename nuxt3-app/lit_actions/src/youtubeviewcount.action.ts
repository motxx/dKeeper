/**
 * NAME: youtubeviewcount
 *
 * Throws if view count of videoId less than threshold.
 * @params videoId
 * @params threshold
 */

import { VerifierResult } from "types";

const fetchAccessToken = async () => {
  const accessTokenProviderURL =
    "https://ef05esawg6.execute-api.ap-northeast-1.amazonaws.com/prod/v1/access-token";
  const resp = await fetch(accessTokenProviderURL);
  return await resp.json();
};

const fetchYouTubeViewCount = async (videoId: string, accessToken: string) => {
  const resp = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${accessToken}`
  );
  const data = await resp.json();
  const viewCount = data.items[0].statistics.viewCount;
  return viewCount;
};

const verifyYouTubeViewCount = async (videoId: string, threshold: number)
  : Promise<VerifierResult> => {
  let result: VerifierResult = {
    data: JSON.stringify({}),
    verified: false,
  };

  const accessToken = await fetchAccessToken().catch((e) => {
    result = {
      data: JSON.stringify({
        message: "failed to fetch access token"
      }),
      verified: false,
    };
    return;
  });
  if (!accessToken) {
    return result;
  }

  const viewCount = await fetchYouTubeViewCount(videoId, accessToken).catch((e) => {
    result = {
      data: JSON.stringify({
        message: "failed to fetch YouTube view count"
      }),
      verified: false,
    };
    return;
  });
  if (!viewCount) {
    return result;
  }

  if (viewCount < threshold) {
    return {
      data: JSON.stringify({
        viewCount,
        threshold,
        message: "viewCount less than threshold",
      }),
      verified: false,
    };
  }

  return {
    data: JSON.stringify({
      viewCount,
      threshold,
    }),
    verified: true,
  };
};

const main = async () => {
  const result = await verifyYouTubeViewCount(videoId, threshold);
  LitActions.setResponse({
    response: JSON.stringify(result),
  });
};

main();
