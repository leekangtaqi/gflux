export function compose(...fns){
    return (...args)=>{
        if(fns.length === 0){
            return args[0];
        }
          
        const last = fns[fns.length-1];
        const rest = fns.slice(0, -1);

        return rest.reduceRight((composed, f)=>f(composed),last(...args))
    }
};