import TermQuery from './TermQuery';
/**
 * Solves an algebric-type expression. This is abstracted using
 * {@link TermQuery} objects to specify term types and {@link Term} objects to
 * create the actual tokens. The solver will add metadata and other resolution
 * information to prevent loops etc.
 */
export default class Solver {
    /**
     * Creates a new solver with a set of given token types
     * @param  {?TermTemplate[]} templates
     * @throws {TypeError} thrown if duplicate template name
     */
    constructor(templates = []) {
        /** @private */
        this.templates = [];
        
        /**
         * An object of {@link TermTemplates} used to specify a type to a
         * {@link Term} object
         * @type {Object}
         */
        this.t = Object.create(null);
        
        /**
         * An object of symbols created for the TermTemplates
         * @type {Object}
         */
        this.types = Object.create(null);
        
        this.addTemplates(templates);
    }
    
    /**
     * Returns the Visual {@link TermQuery} generator for this solver
     * @type {Object}
     */
    get visual() { return TermQuery.fromVisual(this) }
    
    /**
     * Adds a new {@link TermTemplate} type to this solver. This will create the
     * reference symbols and queries will be updated to reference them.
     *
     * @param {TermTemplate[]} templates - List of templates to add
     * @throws {TypeError} thrown if duplicate template name
     */
    addTemplates(templates) {
        templates.forEach(template => {
            if (this.templates.includes(template)) return;
            if (template.name in this.types || template.name in this.t) {
                throw new TypeError(
                    `Duplicate templates with name ${template.name}`
                );
            }
            
            this.templates.push(template);
            this.t[template.name] = template;
            this.types[template.name] = template.name;
            
            template.groups.forEach(groupName => {
                if (groupName in this.types) return;
                this.types[groupName] = groupName;
            });
        });
    }
}
