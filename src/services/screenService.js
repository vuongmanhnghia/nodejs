import { raw } from "body-parser";
import db from "../models/index";
import { name } from "ejs";

let createNewScreen = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let checkExist = await db.Screen.findOne({
				where: {
					cinemaId: data.cinemaId,
					name: data.name,
				},
			});
			if (checkExist) {
				resolve({
					errCode: 1,
					errMessage: "Screen is already exist!",
				});
			} else {
				let checkExistCinema = await db.Cinema.findOne({
					where: {
						id: data.cinemaId,
					},
				});
				if (!checkExistCinema) {
					resolve({
						errCode: 2,
						errMessage: "Cinema is not exist!",
					});
				} else {
					await db.Screen.create({
						cinemaId: data.cinemaId,
						name: data.name,
						totalSeats: data.totalSeats,
					});
					resolve({
						errCode: 0,
						errMessage: "Create screen success!",
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getScreenDetail = (cinemaId) => {
	return new Promise(async (resolve, reject) => {
		if (!cinemaId) {
			resolve({
				errCode: 1,
				errMessage: "Missing required parameter!",
			});
		}
		try {
			let data = await db.Screen.findAll({
				where: { cinemaId: cinemaId },
				raw: true,
			});
			resolve({
				errCode: 0,
				data: data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewScreen: createNewScreen,
	getScreenDetail: getScreenDetail,
};
