import Solver from '../Solver';
import TermTemplate from '../TermTemplate';

/**
 * A typical algebra solver with:
 *
 * | name | description |
 * |------|-------------|
 * |`number(string)`| An actual number |
 * |`variable(string)`| A variable with a name(string) |
 * |`group(any)` | A parenthesized group |
 * |`add`| self-explanatory |
 * |`minus`| self-explanatory |
 * |`times`| self-explanatory |
 * |`divide`| self-explanatory |
 * |`power`| self-explanatory |
 *
 * groups:
 *
 * | name | description |
 * |------|-------------|
 * |`value`| something with numerical value |
 * |`operator`| any operator |
 */
export default class Algebra extends Solver {
    /**
     * Creates algebra solver with preconfigured values.
     */
    constructor() {
        super([
            new TermTemplate('number', ['value']),
            new TermTemplate('variable', ['value']),
            new TermTemplate('group', ['value'], ['val']),
            
            new TermTemplate('add', ['operator'], ['lhs', 'rhs']),
            new TermTemplate('minus', ['operator'], ['lhs', 'rhs']),
            new TermTemplate('times', ['operator'], ['lhs', 'rhs']),
            new TermTemplate('divide', ['operator'], ['lhs', 'rhs']),
            new TermTemplate('power', ['operator'], ['lhs', 'rhs'])
        ], [
            ['operator', 'group']
        ]);
        
        this.addRules([
            // == Constant Folding ==
            new TermRule(
                this.query`operator`,
                ([op], invalid) => this.eval(op) || invalid
            ),
            new TermRule(
                this.query`times(operator value:!operator)`,
                ([op]) => this.term`times(${op.value} ${op.operator})`
            ),
            new TermRule(
                this.query`times(value:!operator operator)`,
                ([op]) => {
                    op.rhs.lhs = this.term`times(${op.lhs} ${op.rhs.lhs})`;
                    op.rhs.rhs = this.term`times(${op.lhs} ${op.rhs.rhs})`;
                    return op;
                }
            ),
            
            // == Algebric Term Resolution ==
            new TermRule(
                this.query`power(value number:${n => n.value < 0})`,
                ([op]) => this.term`divide(number(${1}) power(${op.lhs} ${-op.rhs.value}))`
            )
        ])
    }
}
