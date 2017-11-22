const EventEmitter = require('events').EventEmitter
const Helpers = require('./helper')

class ApiBuilder extends EventEmitter {
  constructor(name, options) {
    super()
    this.options = options || {}
    this._listenerTree = {}
    this._methods = {}
  }
  
  analyzeListenerTree() {
    const methods = this._methods
    const listenerTree = {}
    const self = this
    methods.map((name) => {
      listenerTree[name] = listenerTree[name] || {}
      ['before', 'after'].map(function(type){
        listenerTree[name][type] = self.searchListeners(name, type) || []
      })
    })
    
    this._listenerTree = listenerTree
  }
  searchListeners(methodName, type) {
    const allListenerNames = Object.keys(this._events)
    const listenerNames = []
    const fullType = util.format('%s.%s', type, methodName)
    
    allListenerNames.map((name) => {
      if(minimatch(fullType, name)){
        listenerNames.push(name)
      }
    })
    
    return listenerNames
  }
  
  define (name, options, fn) {
    const self = this
    if (name instanceof ApiMethod) {
      checkMethodExistance(name.name)
      name.setApiBuilder(this)
      this._methods[name.name] = name
		} else {
      checkMethodExistance(name)
      const method = new ApiMethod(name, options, fn)
      method.setApiBuilder(this)
			this._methods[name] = method
		}
	}
}

//addHookFn(ApiBuilder.prototype, 'before')
//addHookFn(ApiBuilder.prototype, 'after')

module.exports = ApiBuilder
