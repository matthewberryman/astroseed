# astroseed

Takes images from [NASA's Earth Polychromatic Imaging Camera (EPIC)](https://epic.gsfc.nasa.gov/epic) instrument aboard [DSCOVR](https://www.nesdis.noaa.gov/content/dscovr-deep-space-climate-observatory) (in a Lissajous orbit at the Sun-Earth L1 Lagrangian point, 1,500,000 km from Earth), computes the SHA256 hash, splits that into a set of 32-bit random seeds, and pushes them onto an AWS SQS queue for applications where a random seed is required. To be evaluated in future research: the statistical properties of generated seeds, to gauge their usefulness for different applications.

## requirements
* [serverless](https://serverless.com/)
  ```shell
  npm install -g serverless
  ```

## installation
Set up your SQS FIFO queue (with content based dedup enabled) and copy and paste its URL into below instructions, along with a NASA API_KEY (optional, otherwise the code defaults to DEMO_KEY)
```shell
export SQS_QUEUE_URL="your_SQS_url"
# export API_KEY=your_API_key
serverless deploy
```

## example
The [EPIC-random branch of the Midsomer Murders bot](https://github.com/matthewberryman/midsomerplots/tree/EPIC-random) as currently in testing at [@mattjb_bot_test](https://twitter.com/mattjb_bot_test).
