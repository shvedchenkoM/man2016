function BaseControls() {}

BaseControls.prototype._drawControls = function(placeholder, controller) {
    placeholder.innerHTML = "";
    var inpData = controller.getAlgoMetaData().inputData;
    Object.keys(inpData).forEach(function(it) {
        var item = inpData[it];
        placeholder.innerHTML += `<li><div class="form-group"><label for="${it}" class="control-label" data-itrans="${item.title}"></label>
            <div>
            <input style="max-width: 80px; display: inline; width: auto" class="form-control" type="${item.type}" id="${it}" max="${item.maxValue}" /></li>
            </div></div>`;
    });
    placeholder.innerHTML += `<div href="#" class="form-group"><div href="#" class="">
        <button type="submit" class="btn btn-default"  onclick="controller.prepData(event)" data-itrans="btn.init"></button>
        </div>
        </div>
        <div class="form-group"><div class="">
        <button type="submit" class="btn btn-default"  onclick="controller.run()" data-itrans="btn.startalgo"></button>
        </div>
        </div>
        `;
};

BaseControls.prototype.cleanup = function() {
    document.querySelector(".sourceview").innerHTML = '';
};