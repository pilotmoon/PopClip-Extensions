# Tana PopClip Extension

Capture text to [Tana](https://tana.inc).

## Configuration

### API Token

Configure a Tana API Token as follows:

1. In the lower left corner of Tana, go *Settings* > *API Tokens*.
2. Select which workspace you want to create a token for, and click *Create token*.
3. Click *Copy*, and then paste the token into the extension settings.

### Node ID

The Node ID identifies where you want PopClip capture text to. By default this is set to `INBOX`, which is your Tana Inbox.

To use a different destination, click *Copy link* in Tana for the node you want to use. The link will look like `https://app.tana.inc?nodeid=DOpqI5MGY8I0`, where `DOpqI5MGY8I0` is the node ID.

## Notes

Author: Nick Moore.

The extension simply takes your selected Markdown content and adds each paragraph to Tana as a node. The source link (if enabled) is added as another node at the end. If you can think of a better way to organise the captured content, please let me know.

Links:

- [Tana API Docs](https://tana.inc/docs/input-api)

## Changelog

- 20 Jun 2024: Initial release.
