/**
 * NAME: youtube-view-count
 *
 * Throws if view count of videoId less than threshold.
 * @params videoId
 * @params threshold
 */

const fetchAccessToken = async () => {
  const accessTokenProviderURL =
    "https://ef05esawg6.execute-api.ap-northeast-1.amazonaws.com/prod/";
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

const main = async (videoId: string, threshold: number) => {
  const accessToken = await fetchAccessToken().catch((e) => {
    throw new Error("failed to fetch access token");
  });
  const viewCount = await fetchYouTubeViewCount(videoId, accessToken).catch(
    (e) => {
      throw new Error("failed to fetch YouTube view count");
    }
  );
  if (viewCount < threshold) {
    throw new Error("viewCount less than threshold");
  }
};

main(videoId, threhold);
