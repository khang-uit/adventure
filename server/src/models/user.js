const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    cmnd: {
        type: String,
        required: true,
    },
    wallet_balance:{
        type: Number,
        required: true,
        default: 0,
    },
    point:{
        type: Number,
        required: true,
        default: 0,
    },
    vouchers_list: {
        type: Array,
        required: true
    },
    role: {
        type: String,
    }

    // resetPasswordToken: {
    //     type: String,
    // },
    // resetPasswordExpire: {
    //     type: String,
    // }
})

// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
    
//     // tạo resetToken và hash nó rồi lưu vào database
    
//     this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//     // Mốc mà token hết hạn
//     this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 phút
  
//     return resetToken;
// };

const User=mongoose.model('User', userSchema)
module.exports=User