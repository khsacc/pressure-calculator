# Pressure Calculator

Hiroki Kobayashi (Kagi Lab at Geochemical Research Centre, School of Science, the University of Tokyo)

This is a ruby-fluorescence-based numerical calculation application, which is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This app can record pressure and temperature information during your experiment. Because the author usually study low-T and high-P conditions using Diamond Anvil Cell (DAC), this app is modified to that kind of situations.

## Getting Started

First, on cloning the repository, run

```bash
yarn
# not npm -i
```

to download dependencies. Then, run the development server by

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

- All the files should be written in Typescript.
- Code formatters (eslint and prettier) are available on your Visual Studio Code to automatically make the code suitable.

## Deploy on Vercel

[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) is utilized for this project to deploy on [https://pressure-calculator.vercel.app/](https://pressure-calculator.vercel.app/).
