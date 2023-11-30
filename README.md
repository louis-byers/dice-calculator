# DiceCalculator

This is a toy app that brute force generates the possible results and the probablility of each for a set of dice with a add/subtract modifier.

Mostly put it together to figure out the damage distributions for spells in D&D. To see how (un)lucky I was.

It has an issue at 50ish million iterations depending on your machine. (10d6 is like 64mil and takes like 20ish seconds on my machine.)

Anyway, pretty standard Angular stuff to run it locally.

It is deployed as a staic site behind a cloudfront distro at https://dice.singebete.com

## Deploying

If you wanna deploy it yourself, there is some [AWS CDK](https://docs.aws.amazon.com/cdk/) code to help out.

Copy the `cdk.json.example` file to `cdk.json` and update the `hostedZoneDomainName` and `distributionDomainName` as appropriate.

Then you can use `npm run aws:cdk [command]` to do stuff. e.g. `npm run aws:cdk diff` then `npm run aws:cdk deploy DiceCalculatorApp`

This kind of assumes you:

1. have bootstrapped AWS CDK in `us-east-1` (required for the cloudfront distros). If not, just follow the prompts.
2. have already created the hosted zone for the domain you specified in `hostedZoneDomainName`

## Stuff below from the generator template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Dice Icons from: https://game-icons.net/tags/dice.html
