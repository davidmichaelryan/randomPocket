getBaseURL = (full_url) ->
  divided = full_url.split('/')
  base_url = divided[2]
  base_url

$.post "/authorize", ( data ) ->
  console.log "SUCCESS"
  $("#auth").remove()
  $("#button").show()
  return 

$("#button").click () ->
  $.post "/random", ( data ) ->
    title = data.resolved_title
    website = getBaseURL data.resolved_url
    url = "http://getpocket.com/a/read/" + data.item_id

    $("#content .title").html title
    $("#content .website").html website
    $("#content a").attr 'href', url 
    $("article").show()
    return