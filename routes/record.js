const express = require('express');
const req = require('express/lib/request');
const recordRoutes = express.Router();
const dbo = require('../db/conn');

// const userlistSchema = {
//     FareId: req.body.fare_id,
//     FareAmount: req.body.fare_amount,
//     CategoryId:req.body.category_id,
//     RouteName:req.body.route_name,
//     isActive:req.body.is_active,
//     ValidTill:req.body.valid_till,
//     CreatedDate:req.body.created_date,
//     createdby:req.body.created_by,
//     LastUpdatedDate:req.body.last_updatedDate,
//     LastUpdatedBy:req.body.last_updatedBy,
//     AgencyId:req.body.agency_id,
//     serverdate:req.body.server_date,
//     Type:req.body.type,
//     ExpiryTime:req.body.expiry_time,
//     ZoneId:req.body.zone_id,
//     Farename:req.body.fare_name,
//     MaxCount:req.body.max_count,
//     ProductDescription:req.body.product_description,
//     ProductMisDescription:req.body.product_misDescription,
//     VerificationStatus:req.body.verification_status,
//     PaymentMode:req.body.payment_mode,
//     ProductName:req.body.product.name,
//     ProductCost:req.body.product_cost,
//     ProductVegCategory:req.body.product_vegCategory,
//     ProductImageURL:req.body.product_imageUrl,
//     Category:req.body.category,
// }
// const generalSchema = {}

// View clients by id
recordRoutes.route('/client/:id').get(async function (_req, res) {
  const dbConnect = await dbo.getDb();
  await dbConnect
    .collection('runmocky')
    .find({ClientID : parseInt(_req.params.id)})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.render("ClientInfo",result[0]);
      }
    });
});

recordRoutes.route('/client/:id/list').get(async function (_req, res) {
  const dbConnect = await dbo.getDb();
  await dbConnect
    .collection('runmocky')
    .find({ClientID : parseInt(_req.params.id)}, {projection: {_id: 0, list: 1}})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
// recordRoutes.route('/runmocky/adddata').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const matchDocument = {
//     listing_id: req.body.id,
//     last_modified: new Date(),
//     session_id: req.body.session_id,
//     direction: req.body.direction,
//   };

//   dbConnect
//     .collection('matches')
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send('Error inserting matches!');
//       } else {
//         console.log(`Added a new match with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });
// });

// This section will help you update a list by id.
// recordRoutes.route('/client/:id/addList').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection('runmocky')
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//       }
//     });
// });

// This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection('listingsAndReviews')
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });

module.exports = recordRoutes;