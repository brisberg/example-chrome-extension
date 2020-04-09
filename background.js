chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  // Clear all rules and add a single rule to check for valid pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log('shisho context clicked?');
  const opts = {url: info.srcUrl};
  chrome.downloads.download(opts, function(downloadId) {
    console.log(`Shisho downloading ID: ${downloadId}`);
  });
});

chrome.contextMenus.create({
  id: 'ss-download',
  // title: chrome.i18n.getMessage('openContextMenuTitle'),
  title: 'SS-download',
  contexts: ['image'],
});
