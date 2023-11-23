import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DiceEquation, DiceResult } from './types';
import { calculateResults, isPastMaxIterations } from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input()
  public diceEquationModifier: number = 0;

  title = 'dice-calculator';
  diceEquation!: DiceEquation;
  diceResult!: DiceResult;

  constructor() {
    this.reset();
  }

  reset() {
    console.log('resetting');
    this.diceEquationModifier = 0;
    this.diceEquation = {
      dice: [],
      modifier: this.diceEquationModifier 
    }
    this.diceResult = {
      equation: this.diceEquation,
      resultSet: {},
      totalResults: 0,
      calculationTime: 0
    }
  }

  // all these functions mutate the diceEquation dice array in place
  addDie(die: number) {
    this.diceEquation.dice.push(die);
    this.diceEquation.dice.sort((a, b) => a - b);

  }

  removeDie(die: number) {
    const index = this.diceEquation.dice.indexOf(die);
    if (index > -1) {
      this.diceEquation.dice.splice(index, 1);
    }
  }

  addModifier(modifier: number) {
    this.diceEquation.modifier += modifier;
  }

  updateResults() {
    this.diceResult = calculateResults(this.diceEquation);
  }

  overLimit() {
    return isPastMaxIterations(this.diceEquation);
  }

  getDisplayList() {
    const sortedKeys = Object.keys(this.diceResult.resultSet).map(key => parseInt(key)).sort((a, b) => a - b);
    return sortedKeys.map(key => {
      const count = this.diceResult.resultSet[key];
      const percentage = this.generatePercentageToOneDecimal(count, this.diceResult.totalResults);
      return {
        key,
        count,
        percentage
      }
    });
  }

  generatePercentageToOneDecimal(count: number, total: number): number {
    return Math.round((count / total) * 10000) / 100;
  }

  printEquation() {
    if (this.diceEquation.dice.length === 0) {
      return '';
    }

    const dieCounts = this.diceEquation.dice.reduce((acc, curr) => {
      if (acc[`${curr}`]) {
        acc[`${curr}`]++;
      } else {
        acc[`${curr}`] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    const dice = Object.keys(dieCounts).map(die => `${dieCounts[die]}d${die}`).join(' + ');
    const modifier = this.diceEquation.modifier !== 0 ? this.diceEquation.modifier > 0 ? ` + ${this.diceEquation.modifier}` : ` ${this.diceEquation.modifier}` : '';
    return `${dice}${modifier}`;
  }

}
