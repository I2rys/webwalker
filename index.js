(async()=>{
    "use strict";

    // Dependencies
    const dirWalker = require("dirw4lker")
    const fs = require("fs")
    
    // Variables
    const args = process.argv.slice(2)
    
    // Main
    if(!args.length) return console.log(`node index.js <output> <url> <extensions>
    Example: node index.js output_test.txt https://google.com js,php,css`)
    
    console.log("Scanning the URL for the extensions you specified. Please wait.")
    var results = ""
    var tempResults = await dirWalker.launch({
        host: args[1],
        ext: args[2],
        asyncRequests: true
    })
    tempResults = tempResults.founds.map((u) => (u.target))
        
    for( i = 0; i <= tempResults.length-1; i++ ) !results.length ? results = tempResults[i] : results += `\n${tempResults[i]}`
    
    console.log("Scanning is finished.")
    fs.writeFileSync(args[0], results, "utf8")
    console.log(`The results has been saved to ${args[0]}`)
    process.exit()
})()