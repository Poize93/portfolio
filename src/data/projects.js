// Google Drive embed: replace /view?usp=... with /preview for iframe
const DRIVE_VIDEO_ID = "1CRd1mvzliyaxS4zeWUKZoZBNNj8cVbz1";
export const selectedWorkVideoUrl = `https://drive.google.com/file/d/${DRIVE_VIDEO_ID}/preview`;

// Dummy project data – replace with your real projects and images
export const projects = [
  {
    id: 0,
    title: "Showreel / Motion Reel",
    category: "Motion",
    year: "2025",
    video: selectedWorkVideoUrl,
    color: "#E8D5B7",
    link: "#",
  },
];

const motionGraphicUrl = [
  "https://drive.google.com/file/d/1C5yUt_Z2ubXp8dev-nyGf0DPQx_63a1T/preview",
  "https://drive.google.com/file/d/1OIk3sLWp-vXZAKO8Bgn5GfeD81NWqgXY/preview",
  "https://drive.google.com/file/d/12RFqZddP7mg6srnfe-fdN2QjDqTlxBiy/preview",
  "https://drive.google.com/file/d/1Bg_Gt4IokXKtr5HwZVecxsfwDULge6rh/preview",
  "https://drive.google.com/file/d/1zQ_sJPrhbwvY21n3Y16UgxnlhY8CdiSo/preview",
  "https://drive.google.com/file/d/1NhTsB2vMjFk9kUg_zZVIelKpYyiG9-j4/preview",
  // "https://drive.google.com/file/d/13hji038rORS_JPUx7HCfK8sNmnkNPO3P/preview",
  "https://drive.google.com/file/d/1RZitp1QWwg1dEDbdtqrXN-xfdVHvCyBT/preview",
  "https://drive.google.com/file/d/1g711EE6FsSgR1dSTrEntMeW-tTOLrxV7/preview",
  "https://drive.google.com/file/d/1cPmGX75W0Z7quvuKbi-mxSGa0h_cje21/preview",
  //

  "https://drive.google.com/file/d/11yE2NWpGuOWIJj3Ct9S0SXBTwgIUlxEa/preview",
  "https://drive.google.com/file/d/1Knr81Nw6O9fUaCcYxFaAgSIpimbqBG9K/preview",
  "https://drive.google.com/file/d/1NmmG_GPFk45-q0NA9Pl8dxhDQerMXf9C/preview",
  //
  "https://drive.google.com/file/d/1LApMW4WjkLlzl8B26JWwapja8HYvnJFX/preview",
  "https://drive.google.com/file/d/1PVWxQPJWgn7fUszMlBLJfcExHZuy7ttF/preview",
];

export const motionGraphics = motionGraphicUrl?.map((item, index) => {
  return {
    id: index,
    title: `Motion Graphics ${index}`,
    category: "Motion",
    year: "2025",
    video: item,
    color: "#E8D5B7",
    link: "#",
  };
});

const graphicDesignUrl = [
  "https://drive.google.com/file/d/1V4bBnQ5_4uc7cJAGyOeZZfBygNNNE-BR/preview",
  "https://drive.google.com/file/d/1L4MHUUHlmWFYXXwc0ObWV1kx4o2om8t_/preview",
  "https://drive.google.com/file/d/1F_tTj2DSuOQZEUSbOWm52gGTjpt2tDft/preview",
  // "https://drive.google.com/file/d/1a3_OCSNimDmuCxfFPtLMQNEOrUaTbA3q/preview",
  "https://drive.google.com/file/d/1nB1vAA9s6ZywgbtILSEZUcnVbfkHMkXr/preview",
  "https://drive.google.com/file/d/1gzBbEDBbuK8jw3y44JfBmecwjABL9Jnm/preview",
  // "https://drive.google.com/file/d/1eIgxdK71cLriLY6wxe4EOUche_CEV3ah/preview",
  "https://drive.google.com/file/d/15CXOsnr79ZsLcLam84kWlqu3F1WRPibZ/preview",
  "https://drive.google.com/file/d/1HiV2zxzD29t2kwyK5NImGvtvJcku0E8T/preview",
  "https://drive.google.com/file/d/1dsi7fniunJvNjLvoD2oXHOkQzCcRdmI6/preview",
  "https://drive.google.com/file/d/1AAQyrC-E0tbt91QXd563JIIPWYgGUqDw/preview",
  "https://drive.google.com/file/d/1plccA2MpeTsDXHBQtpyN5_7aVdkn2QHj/preview",
  "https://drive.google.com/file/d/1kNBTNUeISFrx8c5pLlYxc3ArtFTisZ63/preview",
  "https://drive.google.com/file/d/14Cx9PGhQ1eGHW8Quu8sscWzgXX4JV7NS/preview",
  "https://drive.google.com/file/d/14E1Mq9d4GBjq8X_MoDXUaLEYE2rdvqL9/preview",
  //
  "https://drive.google.com/file/d/1O8lJl6GvAmVgEYUtmMxLW7B_j-wCcBIf/preview",
  "https://drive.google.com/file/d/1KdkHIUnkCACAkMDgeV1H7Lg-V8auxBer/preview",
  "https://drive.google.com/file/d/1J0HPT28FmeqS5fsyCiBMG5PJBoxXR97M/preview",
  "https://drive.google.com/file/d/1m0BpRHpTR5F2TiB59yeyaEqiONAIBFb_/preview",
  "https://drive.google.com/file/d/1Dz9rAavQ1_A46_0M1DSZCNfi44qzX4n4/preview",
  "https://drive.google.com/file/d/12H8fvTbQjFdHn5eXl3M3uXSfConIEBX_/preview",
  "https://drive.google.com/file/d/1qM1v_SKV1Y9Xnmh-Nukesd0G9eoK3vKH/preview",
];

export const graphicDesigns = graphicDesignUrl?.map((item, index) => {
  return {
    id: index,
    title: `Graphic Designs ${index}`,
    category: "Graphic Design",
    year: "2025",
    video: graphicDesignUrl[index],
    color: "#E8D5B7",
    link: "#",
  };
});

const digitalDesignsUrl = [
  "https://drive.google.com/file/d/1w1r08EqQ7gQQBEOdvQSeFVzumva0Im1i/preview",
  "https://drive.google.com/file/d/1ll9EfBGUhFBjQ8dVxTpsQFMrchIf-A2z/preview",
  "https://drive.google.com/file/d/1cInk4v4lbsK6Ylkij8cRltzTkIib11Iq/preview",
  "https://drive.google.com/file/d/1lrEYvkAvfM_mhkw2p5NXMnDXKNY1G2tL/preview",
  "https://drive.google.com/file/d/1A7w5ANpG3kIPxZ4TPjCudQ-xL2h5I344/preview",
  "https://drive.google.com/file/d/1QVP1D58nPEIWe_dyjSqft4OPGlYvtLyq/preview",
  "https://drive.google.com/file/d/1M_oiHPxH7xar1e460LSpXcMFX5tRNDrf/preview",
  "https://drive.google.com/file/d/1Ox-oN9yZr2muVLlenSqRYadMwn7_dOrQ/preview",
  "https://drive.google.com/file/d/1O6et_VPrC_5kPTYRP_tD4NGsR4Y5Amjp/preview",
];

export const digitalDesigns = digitalDesignsUrl?.map((item, index) => {
  return {
    id: index,
    title: `Digital Designs ${index}`,
    category: "Digital Designs",
    year: "2025",
    video: item,
    color: "#E8D5B7",
    link: "#",
  };
});

const digitalIllustrationsUrl = [
  "https://drive.google.com/file/d/1Yh3JnBpRDBZ7hh-aEyHTy5smwxA8gNL6/preview",
  "https://drive.google.com/file/d/1G8phwu9ABizg1MPi6eZ4jgxFpvqxEROs/preview",
  "https://drive.google.com/file/d/1QLZN7CB_zV88OMyH6jm3IfipGfDcgwys/preview",
];

export const digitalIllustrations = digitalIllustrationsUrl?.map(
  (item, index) => {
    return {
      id: index,
      title: `Digital Illustrations ${index}`,
      category: "Digital Illustrations",
      year: "2025",
      video: item,
      color: "#E8D5B7",
      link: "#",
    };
  },
);

const UIDesignsUrl = [
  "https://drive.google.com/file/d/1diXvBP7nTyvsNKYXK49mq9je0w7wshGD/preview",
  "https://drive.google.com/file/d/1LpMS0owkB_wdzrJHqecF-ryuCC2YS0Oj/preview",
  "https://drive.google.com/file/d/1bSd2Ke571vVkAeogFvDMalUrPLntPghI/preview",
  "https://drive.google.com/file/d/1kH1uGGYemeG7_vIY20IbJtIKL9hnabdq/preview",
  "https://drive.google.com/file/d/1zxnW11j7S4xZW_LdRNnSYb-tvvuzdUd9/preview",
  "https://drive.google.com/file/d/1wN_4oGwaeHp5bqtqfYKdxOvM4l56d4mR/preview",
];

export const UIDesigns = UIDesignsUrl?.map((item, index) => {
  return {
    id: index,
    title: `UI Designs {index}`,
    category: "Digital Illustrations",
    year: "2025",
    video: item,
    color: "#E8D5B7",
    link: "#",
  };
});
