var argv = require('yargs')
.command('create', 'createAccount', function (yargs) {
    yargs.options({
        accountName: {
            demand: true,
            alias: 'a',
            description: 'your accountName ',
            type: 'string'
        },
        userName: {
            demand: true,
            alias: 'u',
            description: 'your userName ',
            type: 'string'
        },
        key: {
            demand: true,
            alias: 'k',
            description: 'your key ',
            type: 'string'
        }
    }).help('help');
})
.command('get', 'getAccount', function (yargs) {
    yargs.options({
        accountName: {
            demand: true,
            alias: 'a',
            description: 'your accountName ',
            type: 'string'
        },
        key: {
            demand: true,
            alias: 'k',
            description: 'your key ',
            type: 'string'
        }
    }).help('help');
})
.help('help')
.argv;  
var command = argv._[0];
var storages = require('node-persist');

storages.initSync();
var crypto = require('crypto-js');
function createAccoun(accounName, accounUserName) {
    

    var accoun = storages.getItemSync('accouns');
    //console.log(jas);
    var secretKey = argv.key;
    var account = {
        accountName: accounName,
        accountUserName: accounUserName 
    };
         var a = JSON.stringify(account);
   var encryptedMessage = crypto.AES.encrypt(a, secretKey);
  let data1 =  encryptedMessage.toString();



//    process.exit();

    if(typeof accoun === 'undefined') {
        accoun = [];
        
        accoun.push(data1);
        storages.setItemSync('accouns', accoun);
    } else {
        accoun.push(data1);
        storages.setItemSync('accouns', accoun);
    }
    return acc = storages.getItemSync('accouns');
}
function getAccoun(accounName) {
    var accoun = storages.getItemSync('accouns');
    var encr = accoun;
    //console.log(accoun.length);

    for(var i = 0; i < accoun.length; i++) {
        var a = accoun[i];
        //console.log(accoun.length);
         var bytes = crypto.AES.decrypt(a, argv.key);
         //console.log(bytes);
        // console.log(typeof bytes);
         //console.log(bytes.length);
         var decypt = bytes.toString(crypto.enc.Utf8);
         //console.log(typeof decypt);
         console.log(decypt.length);
         var accou;
         if( decypt.length !== 0 ){
          accou = JSON.parse(decypt);
         }
         var match;
         //console.log(match.length);
          if(typeof accou !== 'undefined' ) {
            match = accou;  
          }
      }
     return match;
}
// console.log(createAccoun({accountName: 'facebook',
// accounUserName: 'a',
// accounPassword: 'abc'}));
if(command === 'create') {
try{
    console.log(createAccoun(argv.accountName, argv.userName));
} catch(e) {
    console.log(e.message);
}
} else if(command === 'get'){
    try {
        var acc = getAccoun(argv.accountName);
        if(typeof acc !== 'undefined') {
            console.log('account found');
    console.log(getAccoun(argv.accountName));
         } else {
             console.log('account not found');
         }
    } catch(e) {
        console.log('you entered wrong key');
    }
    
    }



