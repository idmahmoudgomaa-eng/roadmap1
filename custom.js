function traverse(node, callback) {
  if (!node) {
    return;
  }
  callback(node);
  if (node.ideas) {
    Object.values(node.ideas).forEach(function (child) {
      traverse(child, callback);
    });
  }
}

function collapseAll() {
  var mapContents = document.getElementById('map-contents');
  var map = JSON.parse(mapContents.innerHTML.replace(/&quot;/g, '"'));

  traverse(map, function (node) {
    if (node.ideas && Object.keys(node.ideas).length > 0) {
      if (!node.attr) {
        node.attr = {};
      }
      node.attr.collapsed = true;
    }
  });

  mapContents.innerHTML = JSON.stringify(map);
  mmStart();
}

function expandAll() {
  var mapContents = document.getElementById('map-contents');
  var map = JSON.parse(mapContents.innerHTML.replace(/&quot;/g, '"'));

  traverse(map, function (node) {
    if (node.attr && node.attr.collapsed) {
      delete node.attr.collapsed;
    }
  });

  mapContents.innerHTML = JSON.stringify(map);
  mmStart();
}
