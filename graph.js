const graph = {
  sur: { muscat: 112, bawshar: 212, seeb: 103},
  muscat: { sur: 112, seeb: 15, sohar: 121},
  bawshar: { sur: 212, salalah: 300, nizwa: 56},
  seeb: { sur: 103, muscat: 15, nizwa: 130},
  nizwa: { seeb: 130, ibri: 121, bawshar: 56},
  sohar: { muscat: 121, buraimi: 221, ruwi: 99},
  ibri: { nizwa: 121, salalah: 119, duqm: 160},
  salalah: { bawshar: 300, ibri: 119 },
  buraimi: { sohar: 221, duqm: 291, bahla: 219, ruwi: 117 },
  duqm: { ibri: 160, buraimi: 291, bahla: 165, jabrin: 121},
  ruwi: { sohar: 99, ruwi: 117, manah: 88 },
  manah: { ruwi: 88, bahla: 98},
  bahla: { manah: 98, buraimi: 219, duqm: 165, jabrin: 210},
  jabrin: { duqm: 121, bahla: 210 }
}

// Return the minimum distance from start --> end
function minDistance(start, end) {
  // Build up a queue of nodes to visit
  const visited = {};
  const distances = { [start]: 0 };
  const queueItems = [[0, start]];

  while (queueItems.length > 0) {
    const itemToProcess = queueItems.shift();

    if(!itemToProcess) break;

    const distanceSoFar = itemToProcess[0];
    const targetGraphKey = itemToProcess[1];
    visited[targetGraphKey] = true

    // Arrange the items by increasing mileage in the queue
    const keys = Object.keys(graph[targetGraphKey]).sort((a, b) => {
      return (graph[targetGraphKey][a] - graph[targetGraphKey][b]);
    })

    for(const key of keys) {
      if (visited[key]) continue;

      const updatedDistance = distanceSoFar + graph[targetGraphKey][key];
      if (distances[key]) {
        distances[key] = Math.min(updatedDistance, distances[key]);
      } else {
        distances[key] = updatedDistance;
      }

      queueItems.push([updatedDistance, key]);
    }
  }

  return distances[end];
}


// Tests
console.log("Nizwa to duqm", minDistance("nizwa", "duqm") === 281)
console.log("Sur to Nizwa", minDistance("sur", "nizwa") === 233)
console.log("Muscat to manah", minDistance("muscat", "manah") === 308)

