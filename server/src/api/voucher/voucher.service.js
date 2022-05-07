var Voucher = require("../../models/voucher");

async function addVoucher(reqVoucher){
    const {description, category, supplier_name, point_cost, image} = reqVoucher;

    const newVoucher = new Voucher({
        description,
        category,
        supplier_name,
        point_cost,
        image
    });

    try {
        await newVoucher.save();
        return {
            error: false,
            message: "Tạo voucher thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function addVoucherCode(reqVoucherCode, reqVoucherId ){
    try {
        let voucher = await Voucher.findOne({ reqVoucherId });

        if(!voucher) { 
            return {
                error: true,
                message: 'Không tìm thấy voucher này'
            }
        }

        let oldCodes = voucher.voucher_code;
        let newCodes =[];
        for(let i = 0; i < oldCodes.length; i++)                    
        {
            newCodes.push(oldCodes[i]);
        }
        newCodes.push(reqVoucherCode);
        voucher.vouchers_list = newCodes;
        await voucher.save()

        return {
            error: false,
            message: "Thêm mã voucher thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchers(page){
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Voucher.countDocuments();
        const vouchers = await Voucher.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        return {
            error: false,
            message: `Lấy voucher trang ${page} thành công`,
            current_page: Number(page),
            number_of_pages: Math.ceil(total / LIMIT),
            vouchers
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchersBySearch(searchKey){
    try {
        const description = new RegExp(searchKey, "i");

        const vouchers = await Voucher.find({ description });

        return {
            error: false,
            message: `Search voucher thành công`,
            vouchers
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchersByCategory(category){
    try {
        const vouchers = await Voucher.find({ category: category });

        return {
            error: false,
            message: `Lấy voucher ${category} thành công`,
            vouchers,
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

module.exports = {
    addVoucher,
    addVoucherCode,
    getVouchers,
    getVouchersBySearch,
    getVouchersByCategory
}