var fs = require( 'fs' );

// assumes this is run via node.
function usage( message ) {
  if( message ) {
    console.log( message );
  }
  console.log( "USAGE: " + process.argv[1] + " <path-to-file>" );
}

function json_parse( msg, json_buf ) {
  try {
    var stripComments = require( 'strip-json-comments' )
    var json_str = stripComments( json_buf.toString( 'utf8' ) );
    return json_str;
  }
  catch( e ) {
    var err = "FAILED TO PARSE INPUT JSON: " + msg + ", " + e.message;
    throw err;
  }
}

function run( file_path ) {
  fs.readFile( file_path, function( err, file_buf ) {
    if( err ) { throw err; }
    var json_object = json_parse( "file input", file_buf, 'utf8' );
    console.log( json_object );
  } );
}

var file_path = process.argv[2];
if( ! file_path ) {
  usage( "ERROR: bad/missing argument" );
}
else {
  run( file_path );
}
