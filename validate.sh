#!/bin/sh

# TODO check if strip-json-comments and jayschema is installed

echo "validating json schema..."

# Strips the comments from the json schema, saving the schema without comments
# into a temporary file.
strip-json-comments skin-schema.json > skin-schema-no-comments.json
echo $?
if (( $? != 0 )) ; then
  exit $?
fi

# Validates the skin against the schema using jayschema.
jayschema skin.json skin-schema-no-comments.json
echo $?
if (( $? != 0 )) ; then
  exit $?
fi

# Deletes the temporary file that we created.
rm skin-schema-no-comments.json

echo "success"
exit 0
