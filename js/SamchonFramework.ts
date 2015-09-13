﻿function test()
{
	var str: string =
		"<memberList>\n" +
		"	<member id='jhnam88' pass='1231' />\n" +
		"	<member id='samchon' pass='1231'>Administrator</member>\n" +
		"	<group>3</group>\n" +
		"</memberList>";
	var xml: XML = new XML(str);
	
	var invoke: Invoke = new Invoke("login", "jhnam88", 4, xml);
	alert(invoke.toXML());
}

/**
 * @brief Trace arguments on screen
 *
 * @details
 * <p> Displays arguments on screen by <i>document.write</i>. </p>
 * 
 * <p> If any argument in a trace statement includes a data type other than a string, the trace function 
 * invokes the associated toString() method for that data type. If the argument which is not a string 
 * doesn't have <i>toString()</i> method, only "[object Object]" words will be traced. </p>
 *
 * @warning trace prints words in web page direclty. It can harm ordinary layout of the page.
 *
 * @param args One or more (comma separated) expressions to evaluate. 
 *			   For multiple expressions, a space is inserted between each expression in the output.
 *
 * @author Jeongho Nam
 */
function trace(...args: any[]): void
{
	var str: string = "";
	for (var i: number = 0; i < args.length; i++)
		str += args[i] + (i < args.length - 1) ? ", " : "";

	document.write(str);
}

/* =================================================================================
	LIBRARIES
====================================================================================
	* CONTAINERS
		- PAIR<_Ty1, _Ty2>
		- VECTOR<_Ty>
		- MAP<_Kty, _Ty>
			- MAP_ITERATOR<_Kty, _Ty>
			- DICTIONARY<_Ty>
	
	* UTILITIES
		- STRING_UTIL
		- XML
		- XML_LIST
================================================================================= */
/**
 * @brief A pair of values
 *
 * @details
 * This class couples together a pair of values, which may be of different types (_Ty1 and _Ty2). 
 * The individual values can be accessed through its public members first and second.
 *
 * @tparam _Ty1 Type of member fisrt
 * @tparam _Ty2 Type of member second
 *
 * @note Same with std::pair (http://www.cplusplus.com/reference/utility/pair/)
 * @author Jeongho Nam
 */
class Pair<_Ty1, _Ty2>
{
	/**
	 * @brief The first value in the Pair
	 */
	public first: _Ty1;

	/**
	 * @brief The second value in the Pair
	 */
	public second: _Ty2;

	/**
	 * @brief Construct from pair values
	 *
	 * @param first The first value of the Pair
	 * @param second The second value of the Pair
	 */
	public constructor(first: _Ty1, second: _Ty2)
	{
		this.first = first;
		this.second = second;
	}
	
	/**
	 * @brief Whether a Pair is equal with the Pair.
	 * 
	 * @details 
	 * <p> Compare each first and second value of two Pair(s) and returns whether they are equal or not. </p>
	 * 
	 * <p> If stored key and value in a Pair are not number or string but an object like a class or struct, 
	 * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have 
	 * the member method equals(), only address of pointer will be compared. </p>
	 *
	 * @param obj A Map to compare
	 * @return Indicates whether equal or not.
	 */
	public equals(obj: Pair<_Ty1, _Ty2>): boolean
	{
		var first: boolean;
		var second: boolean;

		if (this.first.hasOwnProperty("equals") && this.first["equals"] instanceof Function)
			first = this.first["equals"](obj.first);
		else
			first = this.first == obj.first;

		if (this.second.hasOwnProperty("equals") && this.second["equals"] instanceof Function)
			second = this.second["equals"](obj.second);
		else
			second = this.second == obj.second;

		return first == true && second == true;
	}

	/**
	 * @brief Returns a string representation of the Map.
	 *
	 * @details
	 * <p> The returned string will follow the form of JSonObject </p>
	 *	\li {"first": "???", "second": ???}
	 */
	public toString(): string
	{
		return "{first: " + this.first + ", second: " + this.second + "}";
	}
}

/**
 * @brief Vector, the dynamic array
 *
 * @details 
 * <p> Vector is an Array. It's not the customary expression that means inheritance but 
 * dictionary meaning of the Array, which means that Vector is the Array, itself. </p>
 *
 * <p> The reason why using Vector instead of Array although there's any difference between
 * Array and Vector is for TypeScript. In TypeScript, Array is considered as an <i>interface</i>.
 * As the reason, any class can't inherit the Array in TypeScript. </p>
 *
 * <p> Vector implements the Array and filled the methods of Array and other classes 
 * can inherit array extending Vector instead of Array. </p>
 *
 * @tparam _Ty Type of elements
 *
 * @author Jeongho Nam
 */
class Vector<_Ty> 
	implements Array<_Ty>
{
	[n: number]: _Ty;

	/**
	 * @brief Default Constructor
	 */
	constructor() {}

	/* ------------------------------------------------------------------------
		ACCESSORS
	------------------------------------------------------------------------ */
	/**
	 * @brief Gets or sets the length of the array. 
	 * @details This is a number one higher than the highest element defined in an array.
	 */
	length: number;
	
	/* ------------------------------------------------------------------------
		MODIFIERS
	------------------------------------------------------------------------ */
	/**
	 * @brief Appends new elements to an array, and returns the new length of the array.
	 *
	 * @param items New elements of the Array.
	 * @return New length of the array.
	 */
	public push(...items: _Ty[]): number { return 0; }
	
	/**
	 * @brief Removes the last element from an array and returns it.
	 */
	public pop(): _Ty { return null; }
	
	/**
	 * @biref Combines two or more arrays.
	 *
	 * @param items Additional items to add to the end of array1.
	 */
	public concat(...items: _Ty[]): _Ty[] { return []; }

	/**
	 * @brief Adds all the elements of an array separated by the specified separator string.
	 *
	 * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
	 */
	public join(separator?: string): string { return ""; }
	
	/**
	 * @brief Reverses the elements in an Array. 
	 */
	public reverse(): _Ty[] { return []; }

	/**
	 * @brief Removes the first element from an array and returns it.
	 */
	public shift(): _Ty { return null; }

	/** 
	 * @brief Returns a section of an array.
	 *
	 * @param start The beginning of the specified portion of the array.
	 * @param end The end of the specified portion of the array.
	 */
	public slice(start?: number, end?: number): _Ty[] { return []; }

	/**
	 * @brief Sorts an array.
	 *
	 * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
	 */
	public sort(compareFn?: (a: _Ty, b: _Ty) => number): _Ty[] { return []; }
	
	/**
	 * @brief Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 *
	 * @param start The zero-based location in the array from which to start removing elements.
	 * @param deleteCount The number of elements to remove.
	 * @param items Elements to insert into the array in place of the deleted elements.
	 */
	public splice(start: number, deleteCount: number = 1, ...items: _Ty[]): _Ty[] { return []; }

	/**
	 * @briefInserts new elements at the start of an array.
	 *
	 * @param items Elements to insert at the start of the Array.
	 */
	public unshift(...items: _Ty[]): number { return 0; }

	/**
	 * @brief Returns the index of the first occurrence of a value in an array.
	 *
	 * @param searchElement The value to locate in the array.
	 * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
	 */
	public indexOf(searchElement: _Ty, fromIndex?: number): number { return 0; }

	/**
	 * @brief Returns the index of the last occurrence of a specified value in an array.
	 *
	 * @param searchElement The value to locate in the array.
	 * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
	 */
	public lastIndexOf(searchElement: _Ty, fromIndex?: number): number { return 0; }

	/**
	 * @brief Determines whether all the members of an array satisfy the specified test.
	 *
	 * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	 */
	public every(callbackfn: (value: _Ty, index: number, array: _Ty[]) => boolean, thisArg?: any): boolean { return false; }

	/**
	 * @brief Determines whether the specified callback function returns true for any element of an array.
	 *
	 * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	 */
	public some(callbackfn: (value: _Ty, index: number, array: _Ty[]) => boolean, thisArg?: any): boolean { return false; }

	/**
	 * @brief Performs the specified action for each element in an array.
	 *
	 * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	 */
	public forEach(callbackfn: (value: _Ty, index: number, array: _Ty[]) => void, thisArg?: any): void { }

	/**
	 * @brief Calls a defined callback function on each element of an array, and returns an array that contains the results.
	 *
	 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. 
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	 */
	public map<U>(callbackfn: (value: _Ty, index: number, array: _Ty[]) => U, thisArg?: any): U[] { return []; }

	/**
	 * @brief Returns the elements of an array that meet the condition specified in a callback function.
	 * 
	 * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. 
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	 */
	public filter(callbackfn: (value: _Ty, index: number, array: _Ty[]) => boolean, thisArg?: any): _Ty[] { return []; }

	/**
	 * @brief Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     *
	 * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
	 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	public reduce(callbackfn: (previousValue: _Ty, currentValue: _Ty, currentIndex: number, array: _Ty[]) => _Ty, initialValue?: _Ty): _Ty { return null; }

	/** 
	 * @brief Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
	 *
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. 
	 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	public reduceRight(callbackfn: (previousValue: _Ty, currentValue: _Ty, currentIndex: number, array: _Ty[]) => _Ty, initialValue?: _Ty): _Ty { return null; }

	/* ------------------------------------------------------------------------
		EXPORTERS
	------------------------------------------------------------------------ */
	/**
	 * @brief Returns a string representation of an array.
	 */
	public toString(): string { return ""; }
	public toLocaleString(): string { return ""; }
}
Vector.prototype = new Array();

/**
 * @brief An interface of a map
 *
 * @tparam _Kty Type of the keys. Each element in a map is uniquely identified by its key value.
 * @tparam _Ty Type of the mapped value. Each element in a map stores some data as its mapped value.
 *
 * @see Map
 * @author Jeongho Nam
 */
interface IMap<_Kty, _Ty>
{
	/**
	 * @brief Whether have the item or not
	 *
	 * @param key Key value of the element whose mapped value is accessed.
	 * @return Whether the map has an item having the specified identifier
	 */
	has(key: _Kty): boolean;

	/**
	 * @brief Get element
	 * 
	 * @param key Key value of the element whose mapped value is accessed.
	 * @return A reference object of the mapped value (_Ty)
	 */
	get(key: _Kty): _Ty;

	/**
	 * @brief Set element
	 *
	 * @param key Key value of the element whose mapped value is accessed.
	 * @param val Value, the item.
	 */
	set(key: _Kty, value: _Ty): void;
}

/**
 * @brief An interface of a dictionary
 *
 * @tparam _Ty Type of the mapped value. Each element in a map stores some data as its mapped value.
 *
 * @see Dictionary
 * @author Jeongho Nam
 */
interface IDictionary<_Ty>
	extends IMap<string, _Ty>
{
}

/**
 * @brief A map containing pairs of key and value
 *
 * @details
 * <p> Map is designed to pursuing formality in JavaScript. </p>
 * 
 * \par Definition of std::unordered_map
 *	\li Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/
 *
 * <p> Unordered maps are associative containers that store elements formed by the combination of 
 * a key value and a mapped value, and which allows for fast retrieval of individual elements 
 * based on their keys. </p>
 *
 * <p> In an unordered_map, the key value is generally used to uniquely identify the element, while the 
 * mapped value is an object with the content associated to this key. Types of key and mapped value may 
 * differ. </p>
 *
 * <p> Internally, the elements in the unordered_map are not sorted in any particular order with respect to 
 * either their key or mapped values, but organized into buckets depending on their hash values to allow 
 * for fast access to individual elements directly by their key values (with a constant average time 
 * complexity on average). </p>
 *
 * <p> unordered_map containers are faster than map containers to access individual elements by their key, 
 * although they are generally less efficient for range iteration through a subset of their elements. </p>
 *
 * <p> Unordered maps implement the direct access operator (operator[]) which allows for direct access of 
 * the mapped value using its key value as argument. </p>
 *
 * <p> Iterators in the container are at least forward iterators. </p>
 *
 * \par Differences between std::unordered_map
 * <ul>
 *	<li> Addicted Methods </li>
 *	<ul>
 *		<li> has := { find(key) != end(); } </li>
 *		<li> set := { insert({key, value}); } </li>
 *		<li> get := { find(key).second; } </li>
 *	</ul>
 *	<li> Depreciated Methods </li>
 *	<ul>
 *		<li> Modifier methods using iterators </li>
 *		<li> operator[] </li>
 *	</ul>
 * </ul>
 *
 * @note 
 * <p> Do not use operator[] and hasOwnProperty(). Use get() and has() instead. </p>
 * <p> Do not iterate by <i>for statement</i> used for dynamic object of JavaScript; <i>for(var key in Map)</i> </p>. 
 * <p> Use <i>iterator</i> with begin() and end() instaed. </p>
 *
 * @tparam _Kty Type of the keys. Each element in a map is uniquely identified by its key value.
 * @tparam _Ty Type of the mapped value. Each element in a map stores some data as its mapped value.
 *
 * @author Jeongho Nam
 */
class Map<_Kty, _Ty>
	implements IMap<_Kty, _Ty>
{
	/**
	 * @brief A data storing elements
	 * @details Map::data_ is a list container of elements(pairs) in Map.
	 */
	private data_: Vector<Pair<_Kty, _Ty>>;
	
	/**
	 * @brief Default Constructor
	 */
	public constructor()
	{
		this.data_ = new Vector<Pair<_Kty, _Ty>>();
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @brief Get data
	 * @details Returns the source container of the Map.
	 *
	 * @note Changes on the returned container influences the source Map.
	 */
	public data(): Vector<Pair<_Kty, _Ty>>
	{
		return this.data_;
	}
	
	/**
	 * @brief Return container size
	 * @details Returns the number of elements in Map container.
	 *
	 * @return The number of elements in the container.
	 */
	public size(): number
	{
		return this.data_.length;
	}

    /**
     * @brief Get iterator to element
     * 
     * <p> Searches the container for an element with a identifier equivalent to <i>key</i> and 
     * returns an iterator to it if found, otherwise it returns an iterator to Map::end(). </p>
     *
     * <p> Two keys are considered equivalent if the container's comparison object returns false 
     * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
     *
     * <p> Another member function, Map.has(), can be used to just check whether 
     * a particular key exists. </p>
     *
     * @param key Key to be searched for
     * @return An iterator to the element, if an element with specified key is found, or Map::end() otherwise.
     */
    public find(key: _Kty): MapIterator<_Kty, _Ty>
    {
        for (var i: number = 0; i < this.data_.length; i++)
            if (this.data_[i].first == key)
                return new MapIterator<_Kty, _Ty>(this, i);

        return this.end();
    }

    /* ---------------------------------------------------------
		GETTERS
	--------------------------------------------------------- */
	/**
	 * @brief Whether have the item or not
	 * @details Indicates whether a map has an item having the specified identifier.
	 *
	 * @param key Key value of the element whose mapped value is accessed.
	 * @return Whether the map has an item having the specified identifier
	 */
	public has(key: _Kty): boolean
	{
		for (var i: number = 0; i < this.data_.length; i++)
			if (this.data_[i].first == key)
				return true;

		return false;
	}

	/**
	 * @brief Get element
	 * @details Returns a reference to the mapped value of the element identified with key.
	 *
	 * @param key Key value of the element whose mapped value is accessed.
	 * @throw exception out of range.
	 *
	 * @return A reference object of the mapped value (_Ty)
	 */
	public get(key: _Kty): _Ty
	{
		for (var i: number = 0; i < this.data_.length; i++)
			if (this.data_[i].first == key)
				return this.data_[i].second;

		throw "out of range";
	}

	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @brief Return iterator to beginning
	 *
	 * @details Returns an iterator referring the first element in the Map container.
	 * @note If the container is empty, the returned iterator is same with end().
	 *
	 * @return 
	 * <p> An iterator to the first element in the container. </p>
	 * <p> The iterator containes the first element's pair; key and value. </p>
	 */
	public begin(): MapIterator<_Kty, _Ty>
	{
		if (this.size() == 0)
			return this.end();

		return new MapIterator<_Kty, _Ty>(this, 0);
	}

	/**
	 * @brief Return iterator to end
	 *
	 * @details
	 * <p> Returns an iterator referring to the past-the-end element in the Map container. </p>
	 *
	 * <p> The past-the-end element is the theoretical element that would follow the last element in 
	 * the Map container. It does not point to any element, and thus shall not be dereferenced. </p>
	 *
	 * <p> Because the ranges used by functions of the Map do not include the element reference 
	 * by their closing iterator, this function is often used in combination with Map::begin() to specify 
	 * a range including all the elements in the container. </p>
	 *
	 * @note
	 * <p> Returned iterator from Map.end() does not refer any element. Trying to accessing 
	 * element by the iterator will cause throwing exception (out of range). </p>
	 * <p> If the container is empty, this function returns the same as Map::begin(). </p>
	 */
	public end(): MapIterator<_Kty, _Ty>
	{
		return new MapIterator<_Kty, _Ty>(this, -1);
	}

	/* ---------------------------------------------------------
		MODIFIERS
	--------------------------------------------------------- */
	/**
	 * @brief Set element
	 *
	 * @details
	 * <p> Set an item as the specified identifier. </p>
	 * 
	 * <p> If the identifier is already in map, change value of the identifier.
	 * If not, then insert the object with the identifier. </p>
	 * 
	 * @param key Key value of the element whose mapped value is accessed.
	 * @param val Value, the item.
	 */
	public set(key: _Kty, value: _Ty): void
	{
		for (var i: number = 0; i < this.data_.length; i++)
			if (this.data_[i].first == key)
			{
				this.data_[i].second = value;
				return;
			}
		this.data_.push(new Pair<_Kty, _Ty>(key, value));
	}

	/**
	 * @brief Erase an element.
	 * @details Removes an element by its key(identifier) from the Map container.
	 *
	 * @param key Key of the element to be removed from the Map.
	 * @throw exception out of range.
	 */
	public erase(key: _Kty): void
	{
		for (var i: number = 0; i < this.data_.length; i++)
			if (this.data_[i].first == key)
			{
				this.data_.splice(i, 1);
				return;
			}

		throw "out of range";
	}

	/**
	 * @brief Clear content.
	 *
	 * @details
	 * <p> Removes all elements from the map container (which are destroyed), 
	 * leaving the container with a size of 0. </p>
	 */
	public clear(): void
	{
		this.data_ = new Vector<Pair<_Kty, _Ty>>();
	}

	/* ---------------------------------------------------------
		COMPARE
	--------------------------------------------------------- */
	/**
	 * @brief Whether a Map is equal with the Map.
	 *
	 * @details
	 * <p> Map::equals() does not compare reference(address of pointer) of Maps or elements 
	 * in the two Maps. The target of comparison are the key and value in all children elements(pairs). 
	 * It's not a matter that order sequence of children are different between two Maps. </p>
	 *
	 * <p> If stored key or value in a pair (element) in those Maps are not number or string, but an object
	 * like a class or struct, the comparison will be executed by a member method (SomeObject)::equals(). If
	 * the object does not have the member method equals(), only address of pointer will be compared. </p>
	 *
	 * @param obj A Map to compare
	 * @return Indicates whether equal or not.
	 */
	public equals(obj: Map<_Kty, _Ty>): boolean
	{
		if (this.size() != obj.size())
			return false;

		for (var i: number = 0; i < this.data_.length; i++)
			if (this.data_[i].equals(obj.data_[i]) == false)
				return false;

		return true;
	}

	/* ---------------------------------------------------------
		EXPORT
	--------------------------------------------------------- */
	/**
	 * @brief Returns a string representation of the Map.
	 *
	 * @details
	 * <p> The returned string will follow the form of JSonObject </p>
	 *	\li {{"key": "???", "value": ???}, {"key": "?", "value": ?}, ...}
	 */
	public toString(): string
	{
		var str: string = "{";
		for (var i: number = 0; i < this.data_.length; i++)
		{
			var pair: Pair<_Kty, _Ty> = this.data_[i];
			var key: string = "\"" + pair.first + "\"";
			var value: string =
				(typeof pair.second == "string")
					? "\"" + pair.second + "\""
					: String(pair.second);

			str += "{\"key\": " + key + ": value: " + value + "}";
		}

		str += "}";
		return str;
	}
}

/**
 * @brief A bi-directional iterator
 *
 * @tparam _Kty Type of the keys. Each element in a map is uniquely identified by its key value.
 * @tparam _Ty Type of the mapped value. Each element in a map stores some data as its mapped value.
 *
 * @author Jeongho Nam
 */
class MapIterator<_Kty, _Ty>
{
	/**
	 * @brief The source map being referenced.
	 */
	private map: Map<_Kty, _Ty>;

	/**
	 * @brief Sequence number of iterator in the source map.
	 */
	private index: number;

    /**
     * @brief Construct from source and index number
     *
     * @note
     * <p> Do not create iterator directly. </p>
     * <p> Use begin(), find() or end() in Map instead. </p> 
     *
     * @param map The source map to reference
     * @param index Sequence number of the element in the source map
     */
	constructor(map: Map<_Kty, _Ty>, index: number)
	{
		this.map = map;
		
		if (index != -1 && index < map.size())
			this.index = index;
		else
			this.index = -1;
	}

	/* ---------------------------------------------------------
		GETTERS AND SETTERS
	--------------------------------------------------------- */
	/**
	 * @brief Get first element (key)
	 */
	public get first(): _Kty
	{
		return this.map.data()[this.index].first;
	}

	/**
	 * @brief Get second element (mapped value)
	 */
	public get second(): _Ty
	{
		return this.map.data()[this.index].second;
	}

	/**
	 * @brief Set first element (key)
	 */
	public set first(key: _Kty)
	{
		this.map.data()[this.index].first = key;
	}

	/**
	 * @brief Set second element (mapped value)
	 */
	public set second(val: _Ty)
	{
		this.map.data()[this.index].second = val;
	}

	/* ---------------------------------------------------------
		COMPARISON
	--------------------------------------------------------- */
	/**
	 * @brief Whether an iterator is equal with the iterator.
	 * @details Compare two iterators and returns whether they are equal or not.
	 * 
	 * @note 
     * <p> Iterator's equals() only compare souce map and index number. </p>
     * <p> Although elements in a pair, key and value are equals, if the source map or
     * index number is different, then the equals() will return false. If you want to
     * compare the elements of a pair, compare them directly by yourself. </p>
	 *
	 * @param obj An iterator to compare
	 * @return Indicates whether equal or not.
	 */
    public equals(obj: MapIterator<_Kty, _Ty>): boolean
	{
        return (this.map == obj.map && this.index == obj.index);
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	/**
	 * @brief Get iterator to previous element
     * @details If current iterator is the first item(equal with <i>begin()</i>), returns end().
     *
     * @return An iterator of the previous item. 
	 */
	public prev(): MapIterator<_Kty, _Ty>
	{
		if (this.index - 1 < 0)
			return this.map.end();
		else
			return new MapIterator<_Kty, _Ty>(this.map, this.index - 1);
	}

	/**
	 * @brief Get iterator to next element
     * @details If current iterator is the last item, returns end().
     *
     * @return An iterator of the next item.
	 */
	public next(): MapIterator<_Kty, _Ty>
	{
		if (this.index + 1 >= this.map.size())
			return this.map.end();
		else
			return new MapIterator<_Kty, _Ty>(this.map, this.index + 1);
	}
}

/**
 * @brief A dictionary
 *
 * @author Jeongho Nam
 */
class Dictionary<_Ty>
	extends Map<string, _Ty>
	implements IDictionary<_Ty>
{
	/**
	 * @brief Default Constructor
	 */
	constructor()
	{
		super();
	}
}

/**
 * @brief A utility class supporting static methods of string
 *
 * @author Jeongho Nam
 */
class StringUtil
{
	/**
	 * @brief Get a tabbed string by specified size
	 */
	public static tab(size: number): string
	{
		var str: string = "";
		for (var i: number = 0; i < size; i++)
			str += "\t";

		return str;
	}

	/**
	 * @brief Replace all patterns of a string
	 */
	public static replaceAll(str: string, pairs: Array<Pair<string, string>>): string
	{
		if (pairs.length == 0)
			return str;

		var foundPairList: Array<Pair<number, number>> = new Array<Pair<number, number>>();
		
		//FIND POSITION-INDEX IN ORIGINAL STRING
		for (var i: number = 0; i < pairs.length; i++) 
        {
			var index: number = 0;

			while (true) 
            {
				index = str.indexOf(pairs[i].first, index);
				if (index == -1)
					break;

				foundPairList.push(new Pair<number, number>(index++, i));
			}
		}

		if (foundPairList.length == 0)
			return str;

		foundPairList.sort();

		//REPLACE
		var res: string = "";
		var index: number = 0;

		while (foundPairList.length > 0) 
        {
			var foundPair = foundPairList[0];
			var before = pairs[foundPair.first].first;
			var after = pairs[foundPair.second].second;

			res += str.substring(index, foundPair.first);
			res += after;

			index = foundPair.first + before.length;
			foundPairList.splice(0, 1);
		}
		if (index <= str.length - 1)
			res += str.substr(index);

		return res;
	}
}

/**
 * @brief XML is a class representing a tree structued xml objects
 *
 * @details 
 * <p> The XML class provides methods and properties for working with XML objects. </p>
 * 
 * <p> The XML class (along with the XMLList and Namespace) implements 
 * the powerful XML-handling standard defined in ECMAScript for XML (E4X) specification. </p>
 *
 * <p> XML class has a recursive, hierarchical relationship. </p>
 * 
 * <p> Relationships between XML and XMLList </p>
 *	\li XML contains XMLList from dictionary of XMLList
 *  \li XMLList contains XML from vector of XML
 * 
 * @note 
 * <p> Do not abuse values for expressing member variables. </p>
 *
 * <table>
 *	<tr>
 *		<th>Standard Usage</th>
 *		<th>Non-standard usage abusing value</th>
 *	</tr>
 *	<tr>
 *		<td>
 *			\<memberList\>\n
 *			&nbsp;&nbsp;&nbsp;&nbsp; \<member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /\>\n
 *			&nbsp;&nbsp;&nbsp;&nbsp; \<member id='master' name='Administartor' birthdate='2011-07-28' /\>\n
 *			\</memberList\>
 *		</td>
 *		<td>
 *			\<member\>\n
 *			&nbsp;&nbsp;&nbsp;&nbsp; \<id\>jhnam88\</id\>\n
 *			&nbsp;&nbsp;&nbsp;&nbsp; \<name\>Jeongho+Nam\</name\>\n
 *			&nbsp;&nbsp;&nbsp;&nbsp; \<birthdate\>1988-03-11\</birthdate\>\n
 *			\</member\>
 *		</td>
 *	</tr>
 * </table>
 * 
 * @author Jeongho Nam
 */
class XML
	extends Dictionary<XMLList>
	implements IDictionary<XMLList>
{
	/**
	 * @brief Tag name of the XML
     *
	 * @details 
	 *	\li \<<b>tag</b> label='property' /\>: tag => \"tag\"
	 *  \li \<<b>price</b> high='1500' low='1300' open='1450' close='1320' /\>: tag => \"price\"
	 */
	private tag: string;

	/**
	 * @brief Value of the XML
     * 
	 * @details  
	 *  \li \<parameter name='age' type='int'\><b>26</b>\</parameter\>: value => 26
	 *	\li \<price high='1500' low='1300' open='1450' close='1320' /\>: tag => null
	 */
	private value: string;

	/**
	 * @brief Properties belongs to the XML
     *
     * @details
     * A Dictionary of properties accessing each property by its key.
     *
     *	\li \<price <b>high='1500' low='1300' open='1450' close='1320'</b> /\>: 
	 *		propertyMap => {{\"high\": 1500}, {\"low\": 1300}, {\"open\": 1450}, {\"close\", 1320}}
	 *	\li \<member <b>id='jhnam88' name='Jeongho+Nam' comment='Hello.+My+name+is+Jeongho+Nam'</b> \>: 
	 *		propertyMap => {{\"id\", \"jhnam88\"}, {\"name\", \"Jeongho Nam\"}, {\"comment\", \"Hello. My name is Jeongho Nam\"}}
	 */
	private properties: Dictionary<string>;
	
	/* -------------------------------------------------------------
		CONSTRUCTORS
	------------------------------------------------------------- */
	/**
	 * @brief Default Constructor.
     *
     * @details
     * <p> If the string parameter is not omitted, constructs its tag, value and 
     * properties by parsing the string. If there's children, then construct the 
     * children XML, XMLList objects, too. </p>
     *
     * @warning
     * <p> Throwing exceptions on parsing are not defined yet. If there's some problem on
     * the string representing the XML object, error will be occured. </p>
     *
     * @param str A string to be parsed
	 */
	public constructor(str: string = "")
	{
		super();

		this.properties = new Dictionary<string>();

		if (str.indexOf("<") == -1)
			return;

		var start: number;
		var end: number;

		//ERASE HEADER OF XML
		if ((start = str.indexOf("<?xml")) != -1) 
        {
			end = str.indexOf("?>", start);

			if (end != -1)
				str = str.substr(end + 2);
		}

		//ERASE COMMENTS
		while ((start = str.indexOf("<!--")) != -1) 
        {
			end = str.indexOf("-->", start);
			if (end != -1)
				break;

			str = str.substr(0, start) + str.substr(end + 3);
		}
		
		//BEGIN PARSING
		this.construct(str);
	}

	/**
	 * @brief Construct XML objects by parsing a string
	 */
	private construct(str: string): void
	{
		this.parseTag(str);
		this.parseProperty(str);

		var res = this.parseValue(str);
		if (res.second == true)
			this.parseChildren(res.first);
	}

    /**
     * @brief Parse and fetch a tag
     */
	private parseTag(str: string): void
	{
		var start: number = str.indexOf("<") + 1;
		var end: number =
			this.calcMinIndex
				(
					str.indexOf(" ", start),
					str.indexOf("\r\n", start),
					str.indexOf("\n", start),
					str.indexOf("\t", start),
					str.indexOf(">", start),
					str.indexOf("/", start)
				);
		if (start == 0 || end == -1) 
			return;
		
		this.tag = str.substring(start, end);
	}

    /**
     * @brief Parse and fetch properties
     */
	private parseProperty(str: string): void
	{
		var start: number = str.indexOf("<" + this.tag) + this.tag.length + 1;
		var end: number = this.calcMinIndex(str.lastIndexOf("/"), str.indexOf(">", start));

		if (start == -1 || end == -1 || start >= end)
			return;
		
		//<comp label='ABCD' /> : " label='ABCD' "
		var line: string = str.substring(start, end);
		if (line.indexOf("=") == -1) 
			return;
		
		var label: string;
		var value: string;
		var helpers: Array<Object> = new Array<Object>();

		var inQuote: boolean = false;
		var quoteType: number;
		var equal: number;

		//INDEXING
		for (var i: number = 0; i < line.length; i++) 
        {
			//Start of quote
			if (inQuote == false && (line.charAt(i) == "'" || line.charAt(i) == "\"")) 
            {
				inQuote = true;
				start = i;

				if (line.charAt(i) == "'")
					quoteType = 1;
				else if (line.charAt(i) == "\"")
					quoteType = 2;
			}
			else if
				(
					inQuote == true &&
					(
						(quoteType == 1 && line.charAt(i) == "'") ||
						(quoteType == 2 && line.charAt(i) == "\"")
					)
				) 
            {
				helpers.push({ "type": quoteType, "start": start, "end": i });
				inQuote = false;
			}
		}

		//CONSTRUCTING
		for (var i: number = 0; i < helpers.length; i++) 
        {
			var quote = helpers[i];

			if (i == 0) 
            {
				equal = line.indexOf("=");
				label = line.substring(0, equal).trim();
			}
			else 
            {
				equal = line.indexOf("=", helpers[i - 1]["end"] + 1);
				label = line.substring(helpers[i - 1]["end"] + 1, equal).trim();
			}
			value = line.substring(helpers[i]["start"] + 1, helpers[i]["end"]);
			
			this.setProperty(label, XML.decodeProperty(value));
		}
	}

    /**
     * @brief Parse and fetch a value
     */
	private parseValue(str: string): Pair<string, boolean>
	{
		var end_slash: number = str.lastIndexOf("/");
		var end_block: number = str.indexOf(">");

		if (end_slash < end_block || end_slash + 1 == str.lastIndexOf("<")) 
        {
			//STATEMENT1: <TAG />
			//STATEMENT2: <TAG></TAG> -> SAME WITH STATEMENT1: <TAG />
			this.value = "";
			
			return new Pair<string, boolean>(str, false);
		}

		var start: number = end_block + 1;
		var end: number = str.lastIndexOf("<");
		str = str.substring(start, end); //REDEFINE WEAK_STRING -> IN TO THE TAG

		if (str.indexOf("<") == -1)
			this.value = XML.decodeValue( str.trim() );
		else
			this.value = "";

		return new Pair<string, boolean>(str, true);
	}

    /**
     * @brief Parse and construct children XML objects
     */
	private parseChildren(str: string): void
	{
		if (str.indexOf("<") == -1)
			return;
		
		var start: number = str.indexOf("<");
		var end: number = str.lastIndexOf(">") + 1;
		str = str.substring(start, end);

		var blockStart: number = 0;
		var blockEnd: number = 0;
		start = 0;

		for (var i: number = 0; i < str.length; i++) 
        {
			if (str.charAt(i) == "<" && str.substr(i, 2) != "</")
				blockStart++;
			else if (str.substr(i, 2) == "/>" || str.substr(i, 2) == "</")
				blockEnd++;

			if (blockStart >= 1 && blockStart == blockEnd) 
            {
				end = str.indexOf(">", i);

				var xmlList: XMLList;
				var xml: XML = new XML();
				xml.construct( str.substring(start, end + 1) );

				if (this.has(xml.tag) == true)
					xmlList = this.get(xml.tag);
				else 
                {
					xmlList = new XMLList();
					this.set(xml.tag, xmlList);
				}
				xmlList.push(xml);
				
				i = end;
				start = end + 1;
				blockStart = 0;
				blockEnd = 0;
			}
		}
	}

	/* -------------------------------------------------------------
		ACCESSORS
	------------------------------------------------------------- */
    /**
     * @brief Get tag
     */
	public getTag(): string
	{
		return this.tag;
	}
    /** 
     * @brief Get value
     */
	public getValue(): string
	{
		return this.value;
	}

    /**
	 * @brief Test wheter a property exists or not
	 */
	public hasProperty(key: string): boolean
	{
		return this.properties.has(key);
	}

    /**
     * @brief Get property by its key
     */
	public getProperty(key: string): string
	{
		return this.properties.get(key);
	}

	/* -------------------------------------------------------------
		SETTERS
	------------------------------------------------------------- */
    /**
	 * @brief Set tag (identifier) of the XML
	 *
	 * @see XML::tag
	 */
	public setTag(str: string): void
	{
		this.tag = str;
	}

    /**
	 * @brief Set value of the XML
	 *
	 * @param val The value to set
	 *
	 * @warning Do not abuse values for expressing member variables
	 * <table>
	 *	<tr>
	 *		<th>Standard Usage</th>
	 *		<th>Non-standard usage abusing value</th>
	 *	</tr>
	 *	<tr>
	 *		<td>
	 *			\<memberList\>\n
	 *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /\>\n
	 *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='master' name='Administartor' birthdate='2011-07-28' /\>\n
	 *			\</memberList\>
	 *		</td>
	 *		<td>
	 *			\<member\>\n
	 *				\<id\>jhnam88\</id\>\n
	 *				\<name\>Jeongho+Nam\</name\>\n
	 *				\<birthdate\>1988-03-11\</birthdate\>\n
	 *			\</member\>
	 *		</td>
	 *	</tr>
	 * </table>
	 */
	public setValue(str: string): void
	{
		this.value = str;
	}

    /**
     * @brief Set a property with its key
     */
	public setProperty(key: string, value: string): void
	{
		this.properties.set(key, value);
	}

    /**
	 * @brief Erase a property by its key
	 *
	 * @param key The key of the property to erase
	 * @throw exception out of range
	 */
	public eraseProperty(key: string): void 
	{
        if(this.properties.has(key) == false)
            throw "out of range";
        else
            this.properties.erase(key);
	}

	/* -------------------------------------------------------------
		FILTERS
	------------------------------------------------------------- */
	private calcMinIndex(... args: number[]): number 
    {
		var min: number = args[0];

		for (var i: number = 1; i < args.length; i++)
		{
			if (args[i] == -1)
				continue;

			if (min == -1 || args[i] < min)
				min = args[i];
		}
		return min;
	}

	/**
	 * @brief Decode a value
	 *
	 * @details
	 * <table>
	 *	<tr>
	 *		<th>Encoded</th>
	 *		<th>Decoded</th>
	 *	</tr>
	 *	<tr>
	 *		<td>\&amp;</td>
	 *		<td>\&</td>
	 *	</tr>
	 *	<tr>
	 *		<td>\&lt;</td>
	 *		<td>\<</td>
	 *	</tr>
	 *	<tr>
	 *		<td>\&gt;</td>
	 *		<td>\></td>
	 *	</tr>
	 * </table>
	 *
	 * @return A decoded string represents a value
	 */
	public static decodeValue(str: string): string 
    {
		var pairs: Array<Pair<string, string>> =
			[
				new Pair("&amp;", "&"),
				new Pair("&lt;", "<"),
				new Pair("&gt;", ">")
			];
		return StringUtil.replaceAll(str, pairs);
	}

    /**
	 * @brief Encode a value
	 *
	 * @brief
	 * <table>
	 *	<tr>
	 *		<th>Original</th>
	 *		<th>Encoded</th>
	 *	</tr>
	 *	<tr>
     *		<td>\&</td>
     *		<td>\&amp;</td>
	 *	</tr>
	 *	<tr>
     *		<td>\<</td>
	 *		<td>\&lt;</td>
	 *	</tr>
	 *	<tr>
     *		<td>\></td>
	 *		<td>\&gt;</td>
	 *	</tr>
	 * </table>
	 *
	 * @return A encoded string represents a value
	 */
	public static encodeValue(str: string): string 
    {
		var pairs: Array<Pair<string, string>> =
			[
				new Pair("&", "&amp;"),
				new Pair("<", "&lt;"),
				new Pair(">", "&gt;")
			];
		return StringUtil.replaceAll(str, pairs);
	}

   /**
	 * @brief Decode a property
	 *
	 * @details
	 * <table>
	 *	<tr>
	 *		<th>Encoded</th>
	 *		<th>Decoded</th>
	 *	</tr>
	 *	<tr>
	 *		<td>\&amp;</td>
	 *		<td>\&</td>
	 *	</tr>
	 *	<tr>
	 *		<td>\&lt;</td>
	 *		<td>\<</td>
	 *	</tr>
	 *	<tr>
	 *		<td>\&gt;</td>
	 *		<td>\></td>
	 *	</tr>
     *	<tr>
	 *		<td>&quot;</td>
	 *		<td>\"</td>
	 *	</tr>
     *	<tr>
	 *		<td>&apos;</td>
	 *		<td>'</td>
	 *	</tr>
	 *	<tr>
	 *		<td>&#x9;</td>
	 *		<td>'</td>
	 *	</tr>
     *	<tr>
	 *		<td>&apos;</td>
	 *		<td>\\t</td>
	 *	</tr>
     *	<tr>
	 *		<td>&#xA;</td>
	 *		<td>\\n</td>
	 *	</tr>
     *	<tr>
	 *		<td>&#xD;</td>
	 *		<td>\\r</td>
	 *	</tr>
	 * </table>
	 *
	 * @return A decoded string represents a property
	 */
    public static decodeProperty(str: string): string 
    {
		var pairs: Array<Pair<string, string>> =
			[
				new Pair("&amp;", "&"),
				new Pair("&lt;", "<"),
				new Pair("&gt;", ">"),
				new Pair("&quot;", "\""),
				new Pair("&apos;", "'"),
				new Pair("&#x9;", "\t"),
				new Pair("&#xA;", "\n"),
				new Pair("&#xD;", "\r"),
			];
		return StringUtil.replaceAll(str, pairs);
	}

    /**
	 * @brief Decode a property
	 *
	 * @details
	 * <table>
	 *	<tr>
	 *		<th>Original</th>
	 *		<th>Encoded</th>
	 *	</tr>
	 *	<tr>
     *		<td>\&</td>
	 *		<td>\&amp;</td>
	 *	</tr>
	 *	<tr>
     *		<td>\<</td>
	 *		<td>\&lt;</td>
	 *	</tr>
	 *	<tr>
     *		<td>\></td>
	 *		<td>\&gt;</td>
	 *	</tr>
     *	<tr>
     *		<td>\"</td>
	 *		<td>&quot;</td>
	 *	</tr>
     *	<tr>
     *		<td>'</td>
	 *		<td>&apos;</td>
	 *	</tr>
	 *	<tr>
     *		<td>'</td>
	 *		<td>&#x9;</td>
	 *	</tr>
     *	<tr>
     *		<td>\\t</td>
	 *		<td>&apos;</td>
	 *	</tr>
     *	<tr>
     *		<td>\\n</td>
	 *		<td>&#xA;</td>
	 *	</tr>
     *	<tr>
     *		<td>\\r</td>
	 *		<td>&#xD;</td>
	 *	</tr>
	 * </table>
	 *
	 * @return A encoded string represents a property
	 */
    public static encodeProperty(str: string): string 
    {
		var pairs: Array<Pair<string, string>> =
			[
				new Pair("&", "&amp;"),
				new Pair("<", "&lt;"),
				new Pair(">", "&gt;"),
				new Pair("\"", "&quot;"),
				new Pair("'", "&apos;"),
				new Pair("\t", "&#x9;"),
				new Pair("\n", "&#xA;"),
				new Pair("\r", "&#xD;"),
			];
		return StringUtil.replaceAll(str, pairs);
	}

	/* -------------------------------------------------------------
		EXPORTS
	------------------------------------------------------------- */
	/**
	 * @brief Convert the XML to a String
	 */
	public toString(level: number = 0): string
	{
		var str: string = StringUtil.tab(level) + "<" + this.tag;
		var childrenString: string = "";

		//PROPERTIES
		for (var p_it = this.properties.begin(); p_it.equals(this.properties.end()) == false; p_it = p_it.next())
			str += " " + p_it.first + "=\"" + XML.encodeProperty(p_it.second) + "\"";
		
		if (this.size() == 0) 
        {
			if (this.value != "")
				str += ">" + XML.encodeValue(this.value) + "</" + this.tag + ">";
			else
				str += " />";
		} 
        else 
        {
			str += ">\n";

			for (var x_it = this.begin(); x_it.equals(this.end()) == false; x_it = x_it.next())
				str += x_it.second.toString(level + 1);
			
			str += StringUtil.tab(level) + "</" + this.tag + ">";
		}
		return str;
	}
}

/**
 * @brief List of XML(s) having same tag
 *
 * @author Jeongho Nam
 */
class XMLList
	extends Vector<XML>
{
	/**
	 * @brief Default Constructor.
	 */
	constructor() 
    {
		super();
	}

    public push(...args: XML[]): number
    {
        var tag: string = args[0].getTag();
        for(var i: number = 1; i < args.length; i++)
            if(args[i].getTag() != tag)
                throw "invalid tag";

        return super.push.call(null, args);
    }

	/**
	 * @brief Convert XMLList to String
	 *
	 * @param level Level(depth) of the XMLList 
	 */
	public toString(level: number = 0): string 
    {
		var str: string = "";
		for (var i: number = 0; i < this.length; i++)
			str += this[i].toString(level) + "\n";

		return str;
	}
}

/* =================================================================================
	PROTOCOLS
==================================================================================== 
	* MESSAGE
		- INVOKE
		- INVOKE_PARAMETER

	* ENTITY
		- IENTITY
			- ENTITY
			- ENTITY_ARRAY
 
	* NETWORK I/O
		- IPROTOCOL
		- SERVER_CONNECTOR

	* UI
		- WINDOW
		- MOVIE
		- SUB_MOVIE
================================================================================= */
/**
 * @brief An interface of message chain.
 * @details IProtocol is an interface of Invoke chain.
 *
 * @author Jeongho Nam
 * @see Invoke
 */
interface IProtocol
{
    /**
	 * @brief Handling replied message
	 *
	 * @details Handles replied message or shifts the responsibility to chain.
	 * @param invoke Replied invoke message 
	 */
	sendData(invoke: Invoke): void;

    /**
	 * @brief Sending message
	 *
	 * @details Sends message to related system or shifts the responsibility to chain.
	 * @param invoke Invoke message to send
	 */
	replyData(invoke: Invoke): void;
}

/**
 * @brief A server connector
 *
 * @author Jeongho Nam
 */
class ServerConnector
	implements IProtocol
{
	private parent: IProtocol;
	private socket: WebSocket;

	private str: string;

	public onopen: Function;

	constructor(parent: IProtocol) 
    {
		this.parent = parent;

		this.str = "";
	}
	public connect(ip: string, port: number): void 
    {
		this.socket = new WebSocket(ip + ":" + port);

		this.socket.onopen = this.handleConnect;
		this.socket.onmessage = this.handleReply;
	}

	/* ----------------------------------------------------
		IPROTOCOL'S METHOD
	---------------------------------------------------- */
	public sendData(invoke: Invoke): void 
    {
		var xml: XML = invoke.toXML();
		var str: string = xml.toString();

		this.socket.send(str);
	}
	public replyData(invoke: Invoke): void 
    {
		this.parent.replyData(invoke);
	}

	/* ----------------------------------------------------
		HANDLING CONNECTION AND MESSAGES
	---------------------------------------------------- */
	private handleConnect(event: Event): void
	{
		this.onopen.apply([event]);
	}
	private handleReply(event: MessageEvent): void
	{
		this.str += event.data;
		var invokeArray: Array<Invoke>;

		var indexPair: Pair<number, number> = null;
		var sizePair: Pair<number, number> = new Pair<number, number>(0, 0);
		var startIndex: number = 0;
		var endIndex: number = 0;

		while (true) 
        {
			var iPair: Pair<number, number> = new Pair<number, number>
				(
					this.str.indexOf("<invoke", startIndex),
					this.str.indexOf("</invoke>", startIndex)
				); //FIND WORDS
			if (iPair.first != -1) sizePair.first++;
			if (iPair.second != -1) sizePair.second++; //AND COUNTS

			if (indexPair == null && sizePair.first == 1) //IF IT MEANS THE START,
				indexPair = new Pair(iPair.first, -1); //SPECIFY THE STARTING INDEX

			//FAILED TO FIND ANYTHING
			if (iPair.first == -1 || iPair.second == -1)
				break;

			/* FOUND SOMETHING FROM NOW ON */

			//AN INVOKE HAS FOUND
			if (indexPair != null && sizePair.first == sizePair.second)
			{
				var start: number = indexPair.first;
				var end: number = indexPair.second + ("</invoke>").length;

				var xml: XML = new XML(this.str.substring(start, end));
				var invoke: Invoke = new Invoke(xml);
				invokeArray.push(invoke);
				
				//CLEAR CURRENT'S INDEX PAIR
				endIndex = end;
				indexPair = null;
			}

			//ADJUST INDEX
			startIndex = Math.max
				(
					Math.max(iPair.first, iPair.second),
					1
				);
		}

		//ERASE USED CHARACTERS
		if (endIndex != 0)
			this.str = this.str.substr(endIndex);

		//CALL REPLY_DATA
		for (var i: number = 0; i < invokeArray.length; i++)
			this.replyData(invokeArray[i]);
	}
}

/**
 * @brief Standard message of network I/O
 *
 * @author Jeongho Nam
 */
class Invoke
	extends Vector<InvokeParameter>
{
	private listener: string;

	/**
	 * @brief Multiple Constructors
	 *
	 * \par Construct from listener
	 *
	 *	\li listener: String => A string represents name of function
	 *
	 * \par Construct from XML
	 *
	 *	\li xml: A XML instance representing Invoke
	 *
	 * \par Construct from arguments
	 *
	 *	\li listener: String => 
	 *	\li value: _Ty => 
	 *	\li arguments: ... Tytes => 
	 */
	constructor(...args)
	{
		super();

		if (args.length == 1)
		{
			var val: any = args[0];

			if (typeof val == "string")
				this.listener = val;
			else if (val instanceof XML)
			{
				var xml: XML = val;
				this.listener = xml.getProperty("listener");

				if (xml.has("parameter") == false)
					return;

				var xmlList: XMLList = xml.get("parameter");
				for (var i: number = 0; i < xmlList.length; i++)
					this.push(new InvokeParameter(xmlList[i]));
			}
		}
		else
		{
			this.listener = args[0];

			for (var i: number = 1; i < args.length; i++)
			{
				var value: any = args[i];

				var parameter: InvokeParameter = new InvokeParameter("", value);
				this.push(parameter);
			}
		}
	}

	/* -------------------------------------------------------------------
		GETTERS
	------------------------------------------------------------------- */
	public getListener(): string
	{
		return this.listener;
	}
	public get(key: string): InvokeParameter
	{
		for (var i: number = 0; i < this.length; i++)
			if (this[i].getName() == key)
				return this[i];

		return null;
	}
	public getArguments(): Array<any>
	{
		var args: Array<any> = [];
		for (var i: number = 0; i < this.length; i++)
			args.push(this[i].getValue());

		return args;
	}

	 /* -------------------------------------------------------------------
		APPLY BY FUNCTION POINTER
	------------------------------------------------------------------- */
	public apply(obj: IProtocol): boolean
	{
		if (!(obj.hasOwnProperty(this.listener) == true && obj[this.listener] instanceof Function))
			return false;
		
		var func: Function = obj[this.listener];
		var args: Array<any> = this.getArguments();

		func.apply(args);

		return true;
	}

	 /* -------------------------------------------------------------------
		EXPORTER
	------------------------------------------------------------------- */
	public toXML(): XML
	{
		var xml: XML = new XML();

		xml.setTag("invoke");
		xml.setProperty("listener", this.listener);

		var xmlList: XMLList = new XMLList();
		for (var i: number = 0; i < this.length; i++)
			xmlList.push(this[i].toXML());

		xml.set("parameter", xmlList);
		return xml;
	}
}

class InvokeParameter
{
	/**
	 * @brief Name of the parameter.
	 *
	 * @details Optional property, can be omitted.
	 */
	private name: string;

	/**
	 * @brief Type of the parameter.
	 */
	private type: string;

	/** 
	 * @brief Value of the parameter.
	 */
	private value: any;
	
	/**
	 * @brief Multiple Constructors
	 *
	 * \par Construct from XML.
	 *
	 *	\li xml: XML => A XML instance representing InvokeParameter.
	 *
	 * \par Construct from value.
	 *
	 *	\li value: _Ty => Value belonged to the parameter.
	 *
	 * \par Construct from specified type and value.
	 *
	 *	\li type: String => Type of the parameter. 
	 *	\li value: _Ty => Value belonged to the parameter.
	 */
	constructor(...args: any[])
	{
		if (args.length == 1 && args[0] instanceof XML)
		{
			var xml: XML = args[0];
			
			this.name = xml.hasProperty("name") ? xml.getProperty("name") : "";
			this.type = xml.getProperty("type");

			if (this.type == "XML")
				this.value = xml.begin().second[0];
			else
				this.value = xml.getValue();
		}
		else if (args.length == 2)
		{
			this.name = args[0];
			var value: any = args[1];

			if (value instanceof Entity || value instanceof EntityArray)
			{
				this.type = "XML";
				this.value = value.toXML();
			}
			else if (value instanceof XML)
			{
				this.type = "XML";
				this.value = value;
			}
			else if (typeof value == "number" || typeof value == "string")
			{
				this.type = typeof value;
				this.value = value;
			}
			else
			{
				this.type = "unknown";
				this.value = value;
			}
		}
		else if (args.length == 3)
		{
			this.name = args[0];
			this.type = args[1];
			this.value = args[2];
		}
	}

	/**
	 * @brief Get name
	 */
	public getName(): string
	{
		return this.name;
	}

	/**
	 * @brief Get type
	 */
	public getType(): string
	{
		return this.type;
	}
	/**
	 * @brief Get value
	 */
	public getValue(): any
	{
		return this.value;
	}

	/**
	 * @brief Convert the parameter to XML.
	 *
	 * @return A XML object represents the parameter.
	 */
	public toXML(): XML
	{
		var xml: XML = new XML();
		xml.setTag("parameter");

		if (this.name != "")
			xml.setProperty("name", this.name);
		xml.setProperty("type", this.type);

		if (this.type == "XML")
		{
			var xmlList: XMLList = new XMLList();
			xmlList.push(this.value);

			xml.set(this.value.tag, xmlList);
		}
		else
			xml.setValue(this.value);

		return xml;
	}
}

/**
 * @brief An application
 *
 * THE CONSTRUCTION ROUTINE
 * <ul>
 * 	<li>Socket Connection</li>
 * 	<ul>
 * 		<li>Connect to the CPP-Server</li>
 * 	</ul>
 * 	<li>Fetch authority</li>
 * 	<ul>
 * 		<li>Send a request to fetching authority</li>
 * 		<li>The window can be navigated to other page by the authority</li>
 * 	</ul>
 * 	<li>Construct Movie</li>
 * 	<ul>
 * 		<li>Determine a Movie by URLVariables::movie and construct it</li>
 * 	</ul>
 * 	<li>All the routines are done</li>
 * </ul>
 * 
 */
class Application
	implements IProtocol
{
	protected socket: ServerConnector;
	protected movie: Movie;

	constructor(movie:Movie, ip: string, port: number)
	{
		this.movie = movie;
		this.socket = new ServerConnector(this);
		this.socket.onopen = this.handleConnect;

		this.socket.connect(ip, port);
	}
	private handleConnect(event: Event): void
	{
	}

	public replyData(invoke: Invoke): void 
    {
		if (invoke.apply(this) == false)
			this.movie.sendData(invoke);
	}
	public sendData(invoke: Invoke): void 
    {
		this.socket.sendData(invoke);
	}
}

/**
 * @brief A movie belonged to an Application
 */
class Movie
	implements IProtocol
{
	protected application: Application;

	public replyData(invoke: Invoke): void
	{
		invoke.apply(this) == false;
	}
	public sendData(invoke: Invoke): void
	{
		this.application.sendData(invoke);
	}
}

/**
 * @brief A sub-movie
 */
class SubMovie
	implements IProtocol 
{
	protected parent: IProtocol;

	public replyData(invoke: Invoke): void 
    {
		invoke.apply(this);
	}
	public sendData(invoke: Invoke): void 
    {
		this.parent.sendData(invoke);
	}
}

/**
 * @brief An interface of Entity
 */
interface IEntity
{
	construct(xml: XML): void;

	TAG(): string;
	key(): any;

	toXML(): XML;
}

class Entity
	implements IEntity
{
	constructor()
	{
		//NOTHING
	}
	public construct(xml: XML): void
	{
		//SOMETHING TO COMPOSE MEMBER DATA
	}

	public TAG(): string { return ""; }
	public key(): any { return ""; }

	public toXML(): XML {
		var xml: XML = new XML();
		xml.setTag(this.TAG());

		return xml;
	}
}

class EntityArray extends Vector<IEntity>
{
	constructor() 
    {
		super();
	}
	public construct(xml: XML): void 
    {
		this.splice(0, this.length);

		if (xml.hasOwnProperty(this.CHILD_TAG()) == false)
			return;

		var xmlList: XMLList = xml[this.CHILD_TAG()];
		for (var i: number = 0; i < xmlList.length; i++) 
        {
			var child: IEntity = this.createChild(xmlList[i]);
			if (child != null)
				this.push(child);
		}
	}

	public createChild(xml: XML): IEntity 
    {
		return null;
	}

	public TAG(): string { return ""; }
	public CHILD_TAG(): string { return ""; }
	public key(): any { return ""; }

	public toXML(): XML
	{
		var xml: XML = new XML();
		xml.setTag(this.TAG());

		if (this.length == 0)
			return xml;

		var xmlList: XMLList = new XMLList();
		for (var i: number = 0; i < this.length; i++)
			xmlList.push(this[i].toXML());

		xml.set(this.CHILD_TAG(), xmlList);

		return xml;
	}
}
