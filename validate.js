var fs = require( 'fs' );
var json_schema_path = process.argv[2];
var json_data_path = process.argv[3];

// unclear to me yet which library to bet on, if not something else entirely.

function validate_with_jjv( schema_object, json_object ) {
    var jjv = require( 'jjv' );
    var env = jjv();
    env.addSchema( 'fromfile', schema_object );
    var validation_result = env.validate( 'fromfile', json_object );
    if( validation_result ) {
        var err = "VALIDATION FAILED: " + JSON.stringify( validation_result );
        throw err;
    }
}

function validate_with_tv4( schema_object, json_object ) {
    var tv4 = require( 'tv4' );
    var validation_result = tv4.validate( json_object, schema_object );
    if( ! validation_result ) {
        var err = "VALIDATION FAILED: " + JSON.stringify( tv4.error );
        throw err;
    }
}

function validate( schema_object, json_object ) {
    validate_with_jjv( schema_object, json_object );
    validate_with_tv4( schema_object, json_object );
    console.log( "passed" );
}

function json_parse( msg, json_str ) {
   try {
       return JSON.parse( json_str );
    }
    catch( e ) {
        var err = "INVALID: " + msg + ", " + e.message;
        throw err;
    }
}

function run( json_schema_path, json_data_path ) {
    fs.readFile( json_schema_path, function( err, schema_string ) {
        if( err ) { throw err; }
        var schema_object = json_parse( "schema input", schema_string );
        fs.readFile( json_data_path, function( err, json_string ) {
            if( err ) { throw err; }
            var json_object = json_parse( "json input", json_string );
            validate( schema_object, json_object );
        } );
    } );
}

run( json_schema_path, json_data_path );



