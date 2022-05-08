var User = require("../../models/user");
var Donation = require("../../models/donation");
var Voucher = require("../../models/voucher");

async function getVoucher(userId){
    try {
        let user = await User.findById(userId);
        if(!user){    
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        let vouchersList = user.vouchers_list;

        return {
            error: false,
            message: "Lấy danh sách quyên góp thành công",
            vouchersList,
        }
    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function postVoucher(userId, voucher_id){
    try {
        let user = await User.findById(userId);
        let voucher = await Voucher.findOne({ _id: voucher_id })
        if(!user) { 
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        if(!voucher) {
            return {
                error: true,
                message: 'Không tìm thấy voucher'
            }
        }

        if(user.point < voucher.point_cost){
            return {
                error: true,
                message: 'Không đủ điểm để đổi lấy voucher'
            }
        }

        if(voucher.voucher_code.length <= 0){
            return {
                error: true,
                message: 'Voucher đã hết số lượng'
            }
        }

        let oldVoucherCodes = voucher.voucher_code;
        let voucherCode = oldVoucherCodes[0];
        oldVoucherCodes.shift();

            let oldVouchers = user.vouchers_list;
            let newVouchers =[];
            for(let i = 0; i < oldVouchers.length; i++)                    
            {
                newVouchers.push(oldVouchers[i]);
            }
            newVouchers.push({
                voucher_code: voucherCode,
                descripion: voucher.descripion,
                category: voucher.category,
                supplier_name: voucher.supplier_name,
                point_cost: voucher.point_cost,
                image: voucher.image,
            });
            voucher.voucher_code = oldVoucherCodes;
            user.vouchers_list = newVouchers;

            user.point -= voucher.point_cost;
            await voucher.save()
            await user.save()

        return {
            error: false,
            message: "Thêm voucher thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getDonation(userId){
    try {
        let user = await User.findById(userId);

        let donationList = await Donation.find({user_id: userId});
        if(!user){    
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        return {
            error: false,
            message: "Lấy danh sách quyên góp thành công",
            donationList,
        }
    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function postDonation(userId, reqDonation){
    try {
        let user = await User.findOne({ _id: userId });
        // if(!user) {  //nếu chưa có userId thì lưu vào
        //     return {
        //         error: true,
        //         message: 'Không tìm thấy người dùng'
        //     }
        // }  
        // else {
        //     let oldDonations = user.donations_list;
        //     let newDonations = [];
        //     for(let i = 0; i < oldDonations.length; i++)                    
        //     {
        //         newDonations.push(oldDonations[i]);
        //     }
        //     newDonations.push(reqDonation);
        //     user.donations_list = newDonations;
        //     if(reqDonation.type_of_donation === "0"){
        //         user.point += Math.floor(reqDonation.money/1000);
        //     }
        //     if(reqDonation.type_of_donation === "1"){
        //         user.point += reqDonation.clothes_amount * 10;
        //     }

        //     await user.save()
        

        const type_of_donation = reqDonation.type_of_donation;
        const money = reqDonation.money;
        const clothes_amount = reqDonation.clothes_amount;
        const address = reqDonation.address;
        const card_id = reqDonation.card_id;

        let point = 0;

        
        if(type_of_donation !== "1" && type_of_donation !== "2"){
            return {
                error: true,
                message: "Lỗi loại quyên góp"
            }
        }

        if(type_of_donation === "1"){
            if(user.wallet_balance < money){
                return {
                    error: true,
                    message: "Không đủ tiền để thực hiện giao dịch"
                }
            }
            user.wallet_balance -= money;
            point += Math.floor(money/1000);
            user.point += point;
        }

        if(type_of_donation === "2"){
            return {
                error: false,
                message: "Vui lòng chờ nhân viên đến địa chỉ để nhận quyên góp để nhận số điểm"
            }
        }

        const newDonation = new Donation({
            user_id: userId,
            type_of_donation,
            money,
            clothes_amount,
            address,
            total_point: point,
            card_id
        });

        await newDonation.save()
        await user.save()
        return {
            error: false,
            message: "Quyên góp thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getUser(userId) {
    try {
        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        if(user.role == "admin"){
            return {
                error: false,
                message: "Tim thay user",
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                phonenumber: user.phonenumber,
                cmnd: user.cmnd,
                wallet_balance: user.wallet_balance,
                point: user.point,
                vouchers_list: user.vouchers_list,
                role: user.role
            }
        }
        
        return {
            error: false,
            message: "Tim thay user",
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            phonenumber: user.phonenumber,
            cmnd: user.cmnd,
            wallet_balance: user.wallet_balance,
            point: user.point,
            vouchers_list: user.vouchers_list,
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function updateUser(userId, reqUserInfo) {
    try {
        const email = reqUserInfo.email;
        const fullname = reqUserInfo.fullname;
        const phonenumber = reqUserInfo.phonenumber;
        const cmnd = reqUserInfo.cmnd;

        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                email: email,
                fullname: fullname,
                phonenumber: phonenumber,
                cmnd: cmnd
            }, 
        )
        
        return {
            error: false,
            message: "Update thành công user",
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

module.exports= {
    getVoucher,
    postVoucher,
    getDonation,
    postDonation,
    getUser,
    updateUser
}