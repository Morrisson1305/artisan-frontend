
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-2UDMKQKL.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ELKXB4AC.js",
      "chunk-IK7H7RIM.js"
    ],
    "route": "/become-artisan"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RR73HZPH.js",
      "chunk-IK7H7RIM.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HBIJXGN2.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3500, hash: '8a965f98400acac1ec9c40d1f03b1c2d6b19739e13b43d795feeb9c7f743f21e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1301, hash: 'bdf607a6db75d40b821d00f9fe06a022227fd35db1f09291a25a02031eef6503', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27274, hash: 'd62ab7f4695c6026c7c010ea96db15b7ad3ab2edbc897558761a4a314b985626', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19046, hash: '7f1be382976437cc81acc7c84b6dae568d23c9988a88d63eecd5b1437e2c80a4', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'become-artisan/index.html': {size: 13892, hash: '190daf438561810943def0fe0c9930bc40da32c47c06245bbb33843a4d767f4f', text: () => import('./assets-chunks/become-artisan_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 14456, hash: 'dfffb0d4f3e53d48d8f56918f080efcec0dd6aea676c2791f064dc08e8bd1a84', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-JMAT7FVG.css': {size: 70251, hash: 'DC3y27d9z5o', text: () => import('./assets-chunks/styles-JMAT7FVG_css.mjs').then(m => m.default)}
  },
};
