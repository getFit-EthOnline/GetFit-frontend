import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";

export const confirmationFrameHtml = getFrameHtmlResponse({
  accepts: {
    xmtp: "2024-02-09",
  },
  isOpenFrame: true,
  buttons: [
    {
      action: "post_redirect",
      label: "Learn more about transaction frames",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=0.0000032`,
});
