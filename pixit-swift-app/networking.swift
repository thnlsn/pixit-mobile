//
//  networking.swift
//  Pixit Mobile
//
//  Created by Thomas Nelson on 2/1/20.
//  Copyright © 2020 Thomas Nelson. All rights reserved.
//

import Foundation
func dude(_ email:String,_ password:String,completionHandler: @escaping (Data?, URLResponse?, Error?) -> Void){
    let url = URL(string: "http://localhost:8080")!
    var request = URLRequest(url: url)
    request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    request.httpMethod = "POST"
    let parameters: [String: Any] = [
        "email": email,
        "password": password
    ]
    do {
        let jsonData = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted)
        request.httpBody = jsonData
        // here "jsonData" is the dictionary encoded in JSON data

        let decoded = try JSONSerialization.jsonObject(with: jsonData, options: [])
        // here "decoded" is of type `Any`, decoded from JSON data

        // you can now cast it with the right type
        if let dictFromJSON = decoded as? [String:String] {
            // use dictFromJSON
        }
    } catch {
        print(error.localizedDescription)
    }
    
    

    let task = URLSession.shared.dataTask(with: request) { data, response, error in completionHandler(data,response,error)
    }

    task.resume()
}
