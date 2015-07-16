#skin-config

To apply the test of a JSON schema against a JSON data file:
npm install
node ./validate.js <schema> <data>

This on-line Java based version gives more-better debug information
when the data fails to pass validation:
http://json-schema-validator.herokuapp.com/

NOTE: We support comments in our schema and skin files using
// or /* */. These are technically not legal and will cause some validators to report
invalid data. Our local vlidator strips out comments. If you need to strip them out
e.g. so you can send the file over to the on-line Java validator mentioned above,
then you have to "npm install -g [strip-json-comments](https://www.npmjs.com/package/strip-json-comments)"
and use it on the command line. On Mac OS X you can pipe the results to pbcopy and then
paste the results into the on-line validator.
