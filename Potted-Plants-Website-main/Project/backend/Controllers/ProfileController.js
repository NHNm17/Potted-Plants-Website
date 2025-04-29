const Account = require("../Model/ProfileModel");

//data display
const getAccount = async (req, res, next) => {
    let account; 

    try {
        account = await Account.findOne();
    } catch (err) {
        console.log(err);
    }

    // Not found
    if (!account) {
        return res.status(404).json({ message: "Users not found" });
    }

    // Display
    return res.status(200).json(account);
};

//data insert
const addAccount = async (req, res, next) => {


    const {firstName, lastName, email, phone} = req.body;
     let account;

     try{
        account = new Account({firstName, lastName, email, phone});
        await account.save();
     }catch (err) {
        console.log(err);
     }
     //don't insert users
     if (!account){
        return res.status(404).json({message:"unable to add"});
     }
     return res.status(200).json(account);
};

    //Update Account Details
    const updateAccount = async (req, res, next) => {
        const id = req.params.id;
        const {firstName, lastName, email, phone} = req.body;
    
        let account;
    
        try{
            account = await Account.findByIdAndUpdate(id,{firstName:firstName, lastName: lastName, email: email, phone: phone });
            account = await account.save();
        }catch (err) {
            console.log(err);
        }
        //not available users
        if (!account){
            return res.status(404).json({message:"Unable to Update User Details"});
         }
         return res.status(200).json({account});
        };

        //Delete User Details
        const deleteAccount = async (req, res, next) => {
            const id = req.params.id;
        
            let account;
        
            try{
                account = await Account.findByIdAndDelete(id)
            }catch (err) {
                console.log(err);
            }
            //not available users
            if (!account){
                return res.status(404).json({message:"Unable to Delete User Details"});
             }
             return res.status(200).json({account});
            };
    
// Export
module.exports={getAccount,addAccount,updateAccount,deleteAccount};
