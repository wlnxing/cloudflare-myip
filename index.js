


/**
 * 
 * @param {any} value 
 * @returns {string}
 */
function toHtmlStr(value){
  return typeof value === 'object'?JSON.stringify(value):value
}



// Export a default object containing event handlers
export default {

  /**
   * @param {Request} req
   * @param {Map} headers
  */
  getReqInfo: (req, headers) => {
    let headersTableStr = ''

    if(headers.size > 0 ) {
      let trtd = ''
      headers.forEach((value, key) => {
        trtd += `<tr>
          <td>${key}</td>
          <td>${toHtmlStr(value)}</td>
        </tr>`
      })

      headersTableStr = 
      `
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${trtd}
        </tbody>
      </table>
      `
      
    } else {
      headersTableStr = '<p class="not-found">No headers found.</p>'
    }


    return `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          td:last-child {
            overflow-wrap: anywhere;
          }
          th {
            background-color: #f2f2f2;
          }
          .not-found {
            font-weight: bold;
            color: red;
          }
        </style>
      </head>
      <body>
        <h1>Request Info</h1>
        <p>Method: ${req.method}</p>
        <p>URL: ${req.url}</p>
        <p>Body: ${req.body}</p>
        <h4>Headers:</h4>
          ${headersTableStr}
        <h4>Cloudflare Keys:</h4>
        <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(req.cf).map(([key, value]) => {
                return `
                  <tr>
                    <td>${key}</td>
                    <td>${toHtmlStr(value)}</td>
                  </tr>`;
              }).join('')}
            </tbody>
        </table>
      </body>
    </html>`;

  },




  /**
   * 
   * @param {Request} request
   * @param {*} env 
   * @param {*} ctx 
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const requrl = new URL(request.url)
    const reqHeaders = new Map(request.headers)

    if (requrl.pathname.startsWith('/info')) {
      return new Response(
        this.getReqInfo(request, reqHeaders),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new Response(
      reqHeaders.get('cf-connecting-ip') || reqHeaders.get('x-real-ip') || 'No IP found',
      // Object.getOwnPropertyNames(request.headers).length,
      { headers: { "Content-Type": "text/html" } }
    );
  },
};