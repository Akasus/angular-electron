import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stacktrace'
})
export class StacktracePipe implements PipeTransform {

  transform(value: string): Stacktrace[] {
    const regex = /(?<func>.*(?=\())?(?<path>(?:|(?<=\()).+)(?=:.*:):(?<line>[0-9]+):(?<pos>[0-9]+)\)*/gm;
    const lines = value.split(' at ').slice(1);
      const stack = lines.map(line => {
        const trimed = line.trim();

        const matches = trimed.matchAll(regex);
        let first: Stacktrace = {};
        for(const match of trimed.matchAll(regex)){
          first = match.groups as Stacktrace;
        }
        first.path = first.path?.replace('(','');
       return first;
      });
      console.log(stack);
      return stack;
  }

}


export interface Stacktrace {
  func?: string;
  path?: string;
  line?: number;
  pos?: number;
}
