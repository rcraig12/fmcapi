const Connect = (options) => {

    if (!options.host){
        console.log('[FMCAPI: No host defined.');
    }

    if (!options.user){
        console.log('[FMCAPI: No user defined.');
    }

    if (!options.password){
        console.log('[FMCAPI: No password defined.');
    } 

    

}

module.exports.Connect = Connect;

